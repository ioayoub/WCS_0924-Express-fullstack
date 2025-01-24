import express from "express";
import {comparePassword, hashPassword} from "../middlewares/argon.middleware";
import {add} from "../modules/user/userActions";
import {getUserByEmail} from "../middlewares/user.middleware";
import {login} from "../modules/auth/authActions";

const router = express.Router();

// Je récupère les données du front
// req.body

// Je hash le mot de passe
// -> hashPassword

// Vérifie si l'utilisateur existe
// getUserByEmail
// S'il existe, on ajoute une nouvelle clé dans le req.body pour pouvoir comparer les mots de passe (formulaire / base de données)

// compare les mots de passe
// comparePassword

// Autoriser l'authentification
// ->

router.post("/register", hashPassword, add);
router.post("/login", getUserByEmail, comparePassword, login)

export default router;
