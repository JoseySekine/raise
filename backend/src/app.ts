import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'

// router
import userRouter from './routes/user'

dotenv.config();

const app = express();
const port = 8080;

const url: string = process.env.MONGODB ?? "";


app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("something went wrong with connect to db");
  });

// ts-node src/app.ts
// ts-node can compile typescript file
