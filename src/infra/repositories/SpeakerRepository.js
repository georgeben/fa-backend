import { pick } from "lodash";
import BaseRepository from "./BaseRepository";

class SpeakerRepository extends BaseRepository {
  constructor({ models: { Speaker } }) {
    super({ Model: Speaker });
    this.Speaker = Speaker;
  }

  async create(payload) {
    const data = pick(payload, ["name", "email", "professionalTitle", "company", "bio", "socials", "photoUrl"]);
    const speaker = new this.Speaker(data);
    return speaker.save();
  }
}

export default SpeakerRepository;
