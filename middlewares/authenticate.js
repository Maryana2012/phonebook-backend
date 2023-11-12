import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../db/models/userModel.js";

dotenv.config();

const {SECRET_KEY}=process.env;

const authenticate = async (req, res, next) =>{
   const {autherization} = req.headers;
   
}