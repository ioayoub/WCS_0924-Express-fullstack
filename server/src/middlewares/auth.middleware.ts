import { RequestHandler } from "express";
import { hashPasswordHelper } from "../services/argon2/argon2.helper";

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
