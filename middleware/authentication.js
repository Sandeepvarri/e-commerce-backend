import UnAuthenticatedError from "../errors/unAuthenticatedError.js";
import UnAuthorizedError from "../errors/unAuthorizedError.js";
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

export const adminAuthorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new UnAuthorizedError("Unauthorised to access this route");
  }
  next();
};
