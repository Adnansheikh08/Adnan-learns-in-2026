import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export async function POST(req:Request){
    await connectDB();
    const {email , password} = await req.json();
    const user = await User.findOne({email});
    if(!user){
        return Response.json({
            error:"User not found"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = signToken({ id: user._id });

  const cookie = serialize("token", token, {
    httpOnly: true,
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login success" }), {
    headers: { "Set-Cookie": cookie },
  });
}