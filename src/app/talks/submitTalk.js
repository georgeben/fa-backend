function submitTalk({ talkRepository, speakerRepository }) {
  return async (payload) => {
    let speaker = await speakerRepository.find({ email: payload.email }, { email: 1 }, { lean: true });
    if (!speaker) {
      speaker = await speakerRepository.create(payload);
    }
    return talkRepository.create({
      ...payload,
      speakerId: speaker._id,
    });
  };
}

export default submitTalk;
