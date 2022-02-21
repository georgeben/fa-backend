function getLoggedInUser({ attendeeRepository, currentUser }) {
  return () => attendeeRepository.find({ _id: currentUser._id });
}

export default getLoggedInUser;
