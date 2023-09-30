import express from "express";
const router = express.Router();

import { signin, signup, hello } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/hello", hello);

export default router;