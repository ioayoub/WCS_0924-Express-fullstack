import express from "express";

const router = express.Router();

import authRouter from "./routes/auth.routes";
import roleRouter from "./routes/role.routes";

router.use("/auth", authRouter);
router.use("/role", roleRouter);

router.get("/test", (req, res) => {
  // Bearer TOTO

  const token = req.headers.authorization?.split(" ")[1];

  console.log(req.cookies);

  res.send("coucou");
});

export default router;
