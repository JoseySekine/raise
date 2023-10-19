import User from "../model/user";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as {
    username?: string;
    email?: string;
    password?: string;
  };
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

      res.status(200).json({ message: "Registration successful" });
    }
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
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

export const getUserData = async (req: Request, res: Response) => {
  const authHeader = req.get("Authorization");
  const email = authHeader?.split(" ")[1];

  // const {email, password} = req.body as {email: "string"; password: string};
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      res.status(200).json(user);
    }
  } catch {
    res.status(400).json({ message: "Cannot find user" });
  }
};

export const editUserInfo = async (req: Request, res: Response) => {
  const { username, email, password, oldPassword, oldEmail } = req.body as {
    username: string;
    email: string;
    password: string;
    oldPassword: string;
    oldEmail: string;
  };

  const user = await User.findOne({ email: oldEmail, password: oldPassword });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.username = username;
  user.email = email;
  user.password = password;

  try {
    await user.save();

    console.log(user);
    res.status(200).json({ message: "User information updated successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
