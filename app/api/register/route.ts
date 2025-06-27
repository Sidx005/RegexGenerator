import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import db from "@/app/lib/db/db";


export const POST=async(req:Request)=>{
    try {
       const {name,email,password}=await req.json();
        if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    }

    const existingUser=await db.user.findUnique({where:{email}})
    if(existingUser){
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
        return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

    } catch (error) {
         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   
    }
}