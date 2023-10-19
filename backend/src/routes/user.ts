import {
  registerUser,
  loginUser,
  getUserData,
  editUserInfo,
} from "../controller/user";
import express from "express";
const router = express.Router();

router.post("/register_user", registerUser);
router.post("/login_user", loginUser);
router.get("/get_user_info", getUserData);
router.patch("/edit_user_info", editUserInfo);

export default router;
