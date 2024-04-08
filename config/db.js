import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async() =>{ 
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected', ${mongoose.connection.host}`.bgGreen);
    }catch(error){
        console.log(`MongoDB issue, ${error}`.bgRed)
    }
}

export default connectDB;