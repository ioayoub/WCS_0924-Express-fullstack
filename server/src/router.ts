import express from "express";

const router = express.Router();

import roleRouter from "./routes/role.routes";

router.use("/role", roleRouter);

export default router;
