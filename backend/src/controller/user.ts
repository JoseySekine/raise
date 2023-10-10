import User from "../model/user";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (req: Request, res: Response) => {
  const username: string | undefined = (req.body as { username?: string })
    .username;
  const email: string | undefined = (req.body as { email?: string }).email;
  const password: string | undefined = (req.body as { password?: string })
    .password;
  const id: string = uuidv4();

  try {
    if (username && email && password) {
      const newUser = new User({
        id: id,
        username: username,
        email: email,
        password: password,
      });

      await newUser.save();

      res.status(200).send("OK");
    }
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const email: string | undefined = (req.body as { email?: string }).email;
  const password: string | undefined = (req.body as { password?: string })
    .password;

  const user = await User.find({ email: email, password: password });
  try {
    if (user) {
      console.log(user);
      res.status(200).send("ok");
    }
  } catch {
    res.status(400).send("Internal Server Error");
  }
};
