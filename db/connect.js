import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST } = process.env;

const connectDb = async () => {
 await mongoose.connect(DB_HOST);
}

export default connectDb;