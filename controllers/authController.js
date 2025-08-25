import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { createTokenUser } from "../utils/createTokenUser.js";
import { attachCookieToResponse } from "../utils/jwt.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

export const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already exists" });
  }

  const user = await User.create({ email, name, password });

  const tokenUser = createTokenUser(user);

  attachCookieToResponse(res, tokenUser);

  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and Password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser(user);

  attachCookieToResponse(res, tokenUser);

  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(StatusCodes.OK).json({ msg: "Logged out Successfully" });
};
