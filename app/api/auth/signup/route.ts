import User from "@/model/User";
import bcrypt from 'bcryptjs'
import connectMongo from "@/db/mongo";
import { NextResponse } from "next/server";

export async function POST(req:NextResponse){
await connectMongo();
 const { name,email,password} = await req.json();
  console.log("data are username",name,email,password)
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    // console.log("salt",salt); 

    const hash = bcrypt.hashSync( password,salt);
// console.log('hash are:',hash)
    const exisitingUser = await User.findOne({email});
    if(exisitingUser){
        return NextResponse.json(
            {message: 'Email is already in use'},
            {status:400}
        );
    }
    const newUser = new User({
        name,
        email,
        password:hash
    });
    await newUser.save();
    console.log('User Registered Successfully');
    return NextResponse.json(
        {message:'User Registered Successfully', user:newUser},
        {status:201}
    );
  } catch (error:any) {
    console.error('Error registering user:', error);
 
 return NextResponse.json(
    { message: 'Error registering user', error: error.message }),
    { status: 500 }
  
}
}