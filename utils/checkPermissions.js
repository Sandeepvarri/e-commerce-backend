import UnAuthorizedError from "../errors/unAuthorizedError.js";

export const checkPermissions = (reqUser, resourceUser) => {
  if (reqUser.role === "admin") return;
  if (reqUser.userId === resourceUser) return;

  throw new UnAuthorizedError("Not authorized to access this route");
};
