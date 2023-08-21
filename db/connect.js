import mongoose from "mongoose";


const { DB_HOST } = process.env;

const connectDb = async () => {
 await mongoose.connect(DB_HOST);

}

export default connectDb;