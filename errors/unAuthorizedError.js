import { StatusCodes } from "http-status-codes";
import CustomeApiError from "./customApiError.js";

class UnAuthorizedError extends CustomeApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnAuthorizedError;
