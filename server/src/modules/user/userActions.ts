import userRepository from "./UserRepository";
import {RequestHandler} from "express";

// B R E A D
export const add : RequestHandler = async (req, res, ) => {
  
  const user  = req.body;
  
  try {
    const insertId : number = await userRepository.create(user);
    
    res.status(201).json({
      insertId : insertId,
      message: "L'utilisateur a bien été crée"
    })
  
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: "Une erreur ..."
    })
  }
  
}

