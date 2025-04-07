import User from "@/model/User";
import bcrypt from 'bcryptjs'
import connectMongo from "@/db/mongo";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
console.log("key is:", SECRET_KEY)
export async function POST(req: Request) {
  await connectMongo();
  const { email, password } = await req.json();
  console.log("data are username", email, password)
  try {

    const user = await User.findOne({ email });
    console.log("user is:", user)
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    console.log("Received password:", password);
    console.log("Stored password hash:", user.password);
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    console.log("Password valid:", isPasswordValid); // Should log 'true' if the passwords match
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    console.log("token is:", token)

    // Set the token as a cookie
    const cookies = cookie.serialize('token', token, {

      path: '/',// Cookie is accessible across the site for now
      maxAge: 60 * 60,
      sameSite: 'strict',// Prevents CSRF
      secure: process.env.NODE_ENV === 'production',// Use secure cookies in production (only sent over HTTPS)
    })
    console.log("cookies is:", cookies)

    // Return the token in the response
    const response = NextResponse.json(
      { message: 'Login successful', token },
      { status: 200 }
    );
    response.headers.set('Set-Cookie', cookies);
    return response;
  } catch (error: any) {
    console.error('Error registering user:', error);

    return NextResponse.json(
      { message: 'Error during login', error: error.message },
      { status: 500 }
    );
  }
}