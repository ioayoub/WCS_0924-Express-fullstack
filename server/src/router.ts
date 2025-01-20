import express from "express";

const router = express.Router();

import authRouter from "./routes/auth.routes";
import roleRouter from "./routes/role.routes";

router.use("/auth", authRouter);
router.use("/role", roleRouter);

export default router;
