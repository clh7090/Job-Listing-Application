import axios from "axios";
import userModel from "../models/userModel";

const getUserById = async (username: string): Promise<userModel> => {
  const { data } = await axios.get<userModel>(
    `http://localhost:8080/api/users/${username}`
  );
  return data;
};

const createUser = async (user: userModel): Promise<void> => {
  const headers = {
    "Content-Type": "application/json",
  };
  await axios.post("http://localhost:8080/api/users", user, {
    headers: headers,
  });
};

export { getUserById, createUser };
