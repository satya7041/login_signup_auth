import { NextResponse } from "next/server";
import { serialize } from "cookie";
import * as cookie from 'cookie';

export async function POST() {
  try {
    // Set the token cookie to expire immediately, effectively logging out the user
    const cookies = cookie.serialize("token", "", {
      path: "/", // Cookie is accessible across the site
      maxAge: -1, // Setting maxAge to -1 deletes the cookie
      sameSite: 'strict', // Prevents CSRF
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production (only sent over HTTPS)
    });

    // Return the response with the cookie to delete the token
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", cookies); // Set the cookie header to remove the token

    return response;
  } catch (error:any) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "Error during logout", error: error.message },
      { status: 500 }
    );
  }
}
