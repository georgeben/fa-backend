/**
 * Send standardized API responses using the JSend specification
 * https://github.com/omniti-labs/jsend
 */
const { StatusCodes } = require("http-status-codes");

class ResponseBuilder {
  static onSuccess(
    res,
    message = "Operation successful",
    data = null,
    statusCode = StatusCodes.OK,
  ) {
    return res.status(statusCode).json({
      status: "success",
      success: true,
      data,
      message,
      statusCode,
    });
  }

  static onError(
    res,
    message = "Operation was unsuccessful",
    data = null,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    return res.status(statusCode).json({
      status: "error",
      success: false,
      data,
      message,
      statusCode,
    });
  }
}

module.exports = ResponseBuilder;
