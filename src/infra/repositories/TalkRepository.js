import { pick } from "lodash";
import BaseRepository from "./BaseRepository";

class TalkRepository extends BaseRepository {
  constructor({ models: { Talk } }) {
    super({ Model: Talk });
    this.Talk = Talk;
  }

  async create(payload) {
    const data = pick(payload, ["title", "description", "durationInMinutes", "speakerId"]);
    const slug = await this.Talk.generateSlug(payload.title);
    const talk = new this.Talk({ ...data, slug });
    return talk.save().then((doc) => doc.populate("speaker"));
  }
}

export default TalkRepository;
