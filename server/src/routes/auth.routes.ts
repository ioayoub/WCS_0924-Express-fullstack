import express from "express";
import { hashPassword } from "../middlewares/auth.middleware";
import { authRegister } from "../modules/auth/authActions";

const router = express.Router();

// 1 - Vérifier l'intégrité des données - MIDDLEWARE

// 3 - Hash du mot de passe - MIDDLEWARE

// 2 - Vérifier si l'email n'est pas déja utilisé - MIDDLEWARE

// router.post("/register", validateAuthRegister, hashPassword, checkUniqueEmail, authRegister);

router.post("/register", hashPassword, authRegister);

export default router;
