"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controller/user");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/register_user", user_1.registerUser);
router.post('/login_user', user_1.loginUser);
exports.default = router;
