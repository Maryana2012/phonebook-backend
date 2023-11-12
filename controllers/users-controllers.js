import User from '../db/models/userModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const {SECRET_KEY} = process.env;

const signup = async (req, res, next) => {
   const {name, email, password}=req.body;
  
   try {
      const user=await User.findOne({email});
      
      if(user){
         res.status(409).json({message: 'Email in use'});
         return

      }
      const newUser = new User({name, email, password});
      await  newUser.hashPassword(password);
      await  newUser.save();
      const payload = {id: newUser._id};

      const token = jwt.sign(payload, SECRET_KEY);
   
      await User.findByIdAndUpdate(newUser._id,{token})
      
      res.status(201).json({
         token,
         user:{name, email}})
   } catch (error) {
    res.status(500).json({message: error.message})
   } 
}

const login =async (req,res,next) =>{
   const {email, password} = req.body;
   const searchedUser = await User.findOne({email});
     if(!searchedUser){
      res.status(401).json({message: "Email or password is wrong"} )
      return
   }
   const compareResult = await searchedUser.comparePassword(password)
 
   if(!compareResult) {
      res.status(401).json({message: "Email or password is wrong"} )
      return;
   }
   const payload = ({id: searchedUser._id})
   const token = jwt.sign(payload, SECRET_KEY);
   await User.findByIdAndUpdate(searchedUser._id, {token});
   res.status(200).json( {
      token:searchedUser.token,
      user:{
         name: searchedUser.name,
         email
      }
   })

}

export default {
    signup,
    login
}