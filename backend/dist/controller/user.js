"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserInfo = exports.getUserData = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const uuid_1 = require("uuid");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const id = (0, uuid_1.v4)();
    try {
        if (username && email && password) {
            const newUser = new user_1.default({
                id: id,
                username: username,
                email: email,
                password: password,
            });
            yield newUser.save();
            res.status(200).json({ message: "Registration successful" });
        }
    }
    catch (_a) {
        res.status(500).send("Internal Server Error");
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = yield user_1.default.findOne({ email });
        if (user && (user === null || user === void 0 ? void 0 : user.password) === password) {
            console.log(user);
            res.status(200).json({ message: "Login successful!" });
        }
        else {
            console.log('user not found');
            throw new Error('User not found');
        }
    }
    catch (e) {
        res.status(400).json({ message: e });
    }
});
exports.loginUser = loginUser;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    const email = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    // const {email, password} = req.body as {email: "string"; password: string};
    const user = yield user_1.default.findOne({ email: email });
    try {
        if (user) {
            res.status(200).json(user);
        }
    }
    catch (_b) {
        res.status(400).json({ message: "Cannot find user" });
    }
});
exports.getUserData = getUserData;
const editUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, oldPassword, oldEmail } = req.body;
    const user = yield user_1.default.findOne({ email: oldEmail, password: oldPassword });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    user.username = username;
    user.email = email;
    user.password = password;
    try {
        yield user.save();
        console.log(user);
        res.status(200).json({ message: "User information updated successfully" });
    }
    catch (_c) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.editUserInfo = editUserInfo;
