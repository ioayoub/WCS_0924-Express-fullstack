import {RequestHandler} from "express";
import {UserType} from "../lib/definitions";
import userRepository from "../modules/user/UserRepository";

export const getUserByEmail: RequestHandler = async (req, res, next) : Promise<void>  => {
  
  try {
    const {email} = req.body;
    const user : UserType | null = await userRepository.readByEmail(email);
    
    if(!user) {
      res.status(404).json({
        message: "Le couple email / mot de passe est incorrect."
      })
      return;
    }
    
    req.body.dbpassword = user.password;
    
    next();
  } catch(e) {
  
  console.log(e)
  }
}