function getTalkBySlug({ talkRepository }) {
  return (slug) => talkRepository.find({ slug }, {}, { lean: true, populate: "speaker" });
}

export default getTalkBySlug;
