function getTalks({ talkRepository }) {
  return () => talkRepository.find({}, {}, { lean: true, populate: "speaker" }, true);
}

export default getTalks;
