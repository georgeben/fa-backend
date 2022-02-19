/**
 * Error handling middleware
 */
import { StatusCodes } from "http-status-codes";
import logger from "infra/logger";
import ResponseBuilder from "../response/ResponseBuilder";

// eslint-disable-next-line no-unused-vars
export default async (err, req, res, next) => {
  if (err.isOperationalError) {
    return ResponseBuilder.onError(res, err.message, err.data, err.status);
  }

  if (err.error && err.error.name === "ValidationError") {
    return ResponseBuilder.onError(
      res,
      err.error.toString(),
      undefined,
      StatusCodes.BAD_REQUEST,
    );
  }

  logger.error("An unknown error occurred", err);

  let errorMessage = "Something went wrong";
  let errorData = null;
  if (process.env.NODE_ENV === "development") {
    errorMessage = err.message;
    errorData = err;
  }
  return ResponseBuilder.onError(res, errorMessage, errorData);
};
