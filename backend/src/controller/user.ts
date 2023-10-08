import User from "../model/user";

export const postUser = async () => {
  const user = new User({
    id: "111",
    username: "jose",
    email: "aaa@com",
    password: "messi",
  });

  const result = await user.save();
  console.log(result);

};

export const registerUser = async () => {
  console.log('called register user page');
}
