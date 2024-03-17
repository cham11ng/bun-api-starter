import { User } from "../models/User";
import ConflictError from "../domain/exceptions/ConflictError";

export const create = async (payload: User) => {
  try {
    const user = new User(payload);

    const res = await user.save();

    return res;
  } catch (e: any) {
    if (e.name === "MongoServerError" && e.code === 11000) {
      throw new ConflictError("User exists.");
    }

    throw e;
  }
};

export const fetchAll = async () => {
  const users = await User.find();

  return users;
};
