import { Router } from "express";
const authRouter = Router();
authRouter.get("/welcome", (req, res) => {
  res.send(`<h1> Welcome, ${req.user}!</h1>`);
});

export default authRouter;
