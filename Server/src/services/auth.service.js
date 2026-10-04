import UserModel from "../models/user.model.js";
import { passwordHash } from "../utils/auth.utils.js";

export const isEmailExist = async (email) => {
  const exist = await UserModel.findOne({ email });

  return !!exist; // the !! will return oly true/false value
};

export const createUser = async (email, name, password) => {
  const user = await UserModel.create({
    email,
    name,
    hashPassword: await passwordHash(password),
  });

  return user;
};
