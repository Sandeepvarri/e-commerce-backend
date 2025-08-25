import { StatusCodes } from "http-status-codes";
import CustomeApiError from "./customApiError.js";

class NotFoundError extends CustomeApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
