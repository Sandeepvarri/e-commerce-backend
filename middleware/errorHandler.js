import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  const customErr = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  if (err.name === "ValidationError") {
    customErr.status = StatusCodes.BAD_REQUEST;
    customErr.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.code && err.code === "11000") {
    customErr.status = StatusCodes.BAD_REQUEST;
    customErr.message = `Duplicate field value: ${JSON.stringify(
      err.keyValue
    )}`;
  }

  if (err.name === "CastError") {
    customErr.status = StatusCodes.BAD_REQUEST;
    customErr.message = `Invalid ${err.path}: ${err.value}`;
  }

  return res.status(customErr.status).json({ msg: customErr.message });
};
