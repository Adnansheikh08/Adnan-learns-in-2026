import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        if(mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("Mongo Jud Gya")
    }
    catch(error){
        console.error(error)
        throw new Error("DB connection fail")
    }
}