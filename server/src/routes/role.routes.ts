import express from "express";
import { validateRole } from "../middlewares/validate.middleware";
import { add } from "../modules/role/roleActions";

const router = express.Router();

router.post("/", validateRole, add);

export default router;
