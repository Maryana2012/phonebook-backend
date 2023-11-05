import User from '../db/models/userModel.js';

const signup = async (req, res, next) => {
   const {name, email, password}=req.body;
   try {
      const user=User.findOne(email);
      if( user){
         res.status(409).json({message: 'Email in use'})
      }
      // const newUser = User.create(name, email, password);
      // res.status(201).json(newUser)
      const newUser = new User({name, email, password});
      await  newUser.hashPassword(password);
      await  newUser.save();
      res.status(201).json(newUser)
   } catch (error) {
    console.log(error)
    req.status(500).json({message: error.message})
   } 
}

export default {
    signup
}