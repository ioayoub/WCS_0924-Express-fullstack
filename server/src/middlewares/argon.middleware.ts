import { RequestHandler } from "express";
import {hashPasswordHelper, verifyPasswordHelper} from "../helpers/argon2/argon2.helper";

export const hashPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;

  try {
    const hashedPassword: string = await hashPasswordHelper(password);
    
    if (hashedPassword) {
      req.body.password = hashedPassword;
      next();
    }
  } catch (e) {
    res.status(500).json({
      message: "Argon is broken !",
    });
  }
};

export const comparePassword : RequestHandler =  async(req, res, next) => {
  try {
    
    const {password, dbpassword} = req.body;
    
    const isValid = await verifyPasswordHelper(dbpassword, password);
    
    if(!isValid) {
      
      delete req.body.dbpassword;
      
      res.status(403).json({
        message: "Le couple email / mot de passe est incorrect."
      })
      return;
    }
    
    next();
    
  } catch(e) {
    res.status(500
    ).json({
      message: "Une erreur est survenue. Veuillez réessayer ultérieurement."
    })
  }
}
