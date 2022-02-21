function getMessages({ chatRepository }) {
  return (room) => chatRepository.find(
    { roomId: room },
    {},
    { populate: "roomId from", lean: true, sort: { createdAt: 1 } },
    true,
  );
}

export default getMessages;
