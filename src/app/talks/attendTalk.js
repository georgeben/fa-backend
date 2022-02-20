import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";

function attendTalk({ talkRepository, attendeeRepository }) {
  return async (talkSlug, payload) => {
    const talk = await talkRepository.find({ slug: talkSlug }, {}, { lean: true });
    if (!talk) {
      throw new ResourceNotFoundError("Talk was not found");
    }

    const attendee = await attendeeRepository
      .findOneAndUpdate({
        email: payload.email,
      },
      { ...payload, $addToSet: { talks: talk._id } },
      { new: true, upsert: true });
    return attendee;
  };
}

export default attendTalk;
