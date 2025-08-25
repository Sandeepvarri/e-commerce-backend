import { StatusCodes } from "http-status-codes";
import CustomeApiError from "./customApiError.js";

class BadRequestError extends CustomeApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
