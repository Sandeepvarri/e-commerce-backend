import { StatusCodes } from "http-status-codes";
import CustomeApiError from "./customApiError.js";

class UnAuthenticatedError extends CustomeApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
