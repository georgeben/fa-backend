import { StatusCodes } from "http-status-codes";
import { pick } from "lodash";
import BaseController from "./BaseController";

class TalkController extends BaseController {
  constructor({ submitTalk, getTalks, attendTalk }) {
    super();
    this.submitTalk = submitTalk;
    this.getTalks = getTalks;
    this.attendTalk = attendTalk;
  }

  async submit(req, res) {
    const payload = pick(
      req.body, [
        "title",
        "description",
        "durationInMinutes",
        "name",
        "email",
        "professionalTitle",
        "company",
        "bio",
        "socials",
        "photoUrl",
      ],
    );
    const talk = await this.submitTalk(payload);
    return this.responseBuilder.onSuccess(res, "Successfully submitted talk", talk, StatusCodes.CREATED);
  }

  async getAll(req, res) {
    const talks = await this.getTalks();
    return this.responseBuilder.onSuccess(res, "Successfully listed all talks", talks);
  }

  async attend(req, res) {
    const payload = pick(req.body, ["name", "email"]);
    const { slug } = req.params;
    const response = await this.attendTalk(slug, payload);
    return this.responseBuilder.onSuccess(res, "You've successfully joined talk", response);
  }
}

export default TalkController;