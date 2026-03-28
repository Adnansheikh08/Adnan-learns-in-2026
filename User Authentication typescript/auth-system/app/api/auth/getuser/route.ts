import { connectDB } from "@/lib/db";
import User from "@/models/User";


export async function GET(req:Request){
    await connectDB()
    const user = await User.find();
    return Response.json({user
    })
    
}