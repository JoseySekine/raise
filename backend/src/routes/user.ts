import { registerUser, loginUser } from "../controller/user";
import express from "express";
const router = express.Router();

router.post("/register_user", registerUser);
router.post('/login_user', loginUser)

export default router;
