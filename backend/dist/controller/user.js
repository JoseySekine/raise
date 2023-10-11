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
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const uuid_1 = require("uuid");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const username: string | undefined = (req.body as { username?: string })
    //   .username;
    // const email: string | undefined = (req.body as { email?: string }).email;
    // const password: string | undefined = (req.body as { password?: string })
    //   .password;
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
    // const email: string | undefined = (req.body as { email?: string }).email;
    // const password: string | undefined = (req.body as { password?: string })
    //   .password;
    const { email, password } = req.body;
    const user = yield user_1.default.find({ email: email, password: password });
    try {
        if (user) {
            console.log(user);
            res.status(200).send("ok");
        }
    }
    catch (_b) {
        res.status(400).send("Internal Server Error");
    }
});
exports.loginUser = loginUser;
