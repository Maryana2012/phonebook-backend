import User from '../db/models/userModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import gravatar from 'gravatar';
dotenv.config();

const {SECRET_KEY} = process.env;

const replaceSpace = (filename) =>{
   return filename.replace(/\s+/g, '_');
};

const signup = async (req, res) => {
   const {name, email, password}=req.body;
  
   try {
      const user=await User.findOne({email});
      
      if(user){
         res.status(409).json({message: 'Email in use'});
         return

      }
      const avatarURL = gravatar.url(email, {s:'200', r:'pg', d: 'mp'})
      const newUser = new User({name, email, password, avatarURL});
      await newUser.hashPassword(password);
      await newUser.save();
      const payload = {id: newUser._id};

      const token = jwt.sign(payload, SECRET_KEY);
   
      await User.findByIdAndUpdate(newUser._id,{token});
      
      res.status(201).json({
         token,
         user:{name, email, avatarURL}})
   } catch (error) {
    res.status(500).json({message: error.message})
   } 
}

const login =async (req,res) =>{
   const {email, password} = req.body;
   try {
      
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
         token,
         user:{
            name: searchedUser.name,
            email,
            avatarURL: searchedUser.avatarURL
         }
      })
   } catch (error) {
     res.status(500).json({message: error.message})
   }

}

const logout = async (req, res)=>{
   try {
      const {_id} = req.user;
      await User.findByIdAndUpdate(_id, {token:""});
      res.status(204).send();
   } catch (error) {
       res.status(400).json({message:error.message});
   }
}

const getCurrentUser = async (req, res)=>{
   const {email, name, avatarURL} = req.user;
   res.json({
      name,
      email,
      avatarURL
   }) 

}


const changeAvatar = async (req, res) =>{
   const {_id } = req.user;
   try {
      const {path: tempDir , originalname} = req.file;
      const normalizeName =  replaceSpace(originalname);
      const uniqueFileName = `${_id}-${normalizeName}`;
      const avatarsPath = path.resolve('public', 'avatars');
      const resultPath = path.join(avatarsPath, uniqueFileName);
   
      await fs.copyFile(tempDir, resultPath);
      const avatarURL = path.join('avatars', uniqueFileName);
        
      await User.findByIdAndUpdate(_id, {avatarURL});
      res.status(200).json({avatar: avatarURL})
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

export default {
    signup,
    login,
    logout,
    getCurrentUser,
    changeAvatar
}