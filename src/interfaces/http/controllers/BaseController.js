import ResponseBuilder from "../response/ResponseBuilder";

class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new TypeError("Cannot construct BaseController instances directly");
    }
    this.responseBuilder = ResponseBuilder;
  }
}
export default BaseController;
