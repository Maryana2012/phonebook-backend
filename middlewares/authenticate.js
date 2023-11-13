import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../db/models/userModel.js";

dotenv.config();

const {SECRET_KEY}=process.env;

export const authenticate = async (req, res, next) =>{
   const {authorization = '' } = req.headers;
   const [bearer, token] = authorization.split(' '); 
   if(bearer !== 'Bearer'){
      res.status(401).json({message: "Not authorized "})
      return;
   }
   try {
      const {id} = jwt.verify(token, SECRET_KEY);
      const searchedUser = await User.findById(id);
      
      if(!searchedUser || !searchedUser.token || token !== searchedUser.token){
        res.status(401).json({message: "Not authorized"});
        return;
      }
      req.user = searchedUser;
      next();
   } catch (error) {
      res.status(401).json({message: error.message})
   }

}