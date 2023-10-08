"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// controller
const user_1 = __importDefault(require("../controller/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
const url = (_a = process.env.MONGODB) !== null && _a !== void 0 ? _a : "";
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(user_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("connected");
})
    .catch(() => {
    console.log("something went wrong with connect to db");
});
// ts-node src/app.ts
// ts-node can compile typescript file
