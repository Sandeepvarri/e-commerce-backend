import UnAuthenticatedError from "../errors/unAuthenticatedError.js";
import { isValidToken } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const { name, userId, role } = isValidToken(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
