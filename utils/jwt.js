import jwt from "jsonwebtoken";

export const createJWTToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });

  return token;
};

export const attachCookieToResponse = (res, user) => {
  const token = createJWTToken({ payload: user });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export const isValidToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
