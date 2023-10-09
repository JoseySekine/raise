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
exports.registerUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const uuid_1 = require("uuid");
const registerUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body
        .username;
    const email = req.body.email;
    const password = req.body
        .password;
    const id = (0, uuid_1.v4)();
    if (username && email && password) {
        const newUser = new user_1.default({
            id: id,
            username: username,
            email: email,
            password: password,
        });
        console.log(newUser);
    }
});
exports.registerUser = registerUser;
