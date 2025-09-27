import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
};
