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
exports.registerUser = exports.postUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const postUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default({
        id: "111",
        username: "jose",
        email: "aaa@com",
        password: "messi",
    });
    const result = yield user.save();
    console.log(result);
});
exports.postUser = postUser;
const registerUser = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('called register user page');
});
exports.registerUser = registerUser;
