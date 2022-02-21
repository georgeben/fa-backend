import { StatusCodes } from "http-status-codes";
import { pick } from "lodash";
import BaseController from "./BaseController";

class TalkController extends BaseController {
  constructor({
    submitTalk, getTalks, attendTalk, getTalkBySlug, getMessages,
  }) {
    super();
    this.submitTalk = submitTalk;
    this.getTalks = getTalks;
    this.attendTalk = attendTalk;
    this.getTalkBySlug = getTalkBySlug;
    this.getMessages = getMessages;
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

  async getOne(req, res) {
    const { slug } = req.params;
    const talk = await this.getTalkBySlug(slug);
    return this.responseBuilder.onSuccess(res, "Successfully fetched talk", talk);
  }

  async attend(req, res) {
    const { slug } = req.params;
    const attendee = await this.attendTalk(slug);
    return this.responseBuilder.onSuccess(res, "You've successfully joined talk", attendee);
  }

  async listChats(req, res) {
    const { id } = req.params;
    const messages = await this.getMessages(id);
    return this.responseBuilder.onSuccess(res, "Listed all messages", messages);
  }
}

export default TalkController;
