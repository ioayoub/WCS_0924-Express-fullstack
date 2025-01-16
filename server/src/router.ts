import express from "express";

const router = express.Router();

import RoleRouter from "./routes/role.routes";

router.use("/role", RoleRouter);

export default router;
