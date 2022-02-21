function getTalks({ talkRepository }) {
  return () => talkRepository.find({}, {}, { lean: true, populate: "speaker", sort: { createdAt: -1 } }, true);
}

export default getTalks;
