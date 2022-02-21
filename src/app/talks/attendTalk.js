import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";

function attendTalk({ talkRepository, attendeeRepository, currentUser }) {
  return async (talkSlug) => {
    const talk = await talkRepository.find({ slug: talkSlug }, {}, { lean: true });
    if (!talk) {
      throw new ResourceNotFoundError("Talk was not found");
    }

    const attendee = await attendeeRepository
      .findOneAndUpdate({
        _id: currentUser._id,
      },
      { $addToSet: { talks: talk._id } },
      { new: true, upsert: true });
    return attendee;
  };
}

export default attendTalk;
