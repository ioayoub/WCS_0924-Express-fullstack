import express from "express";
import { add } from "../modules/roleActions";

const router = express.Router();

router.post("/", add);

export default router;
