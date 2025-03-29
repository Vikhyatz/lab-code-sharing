import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connection string connected", conn.connection.host);
    }catch(error){
        console.log(error);
    }
}

export default connectDb;