function saveMessage({ chatRepository }) {
  return (payload) => chatRepository.createDoc({ ...payload });
}

export default saveMessage;
