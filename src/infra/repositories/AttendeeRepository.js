import BaseRepository from "./BaseRepository";

class AttendeeRepository extends BaseRepository {
  constructor({ models: { Attendee } }) {
    super({ Model: Attendee });
    this.Attendee = Attendee;
  }
}

export default AttendeeRepository;
