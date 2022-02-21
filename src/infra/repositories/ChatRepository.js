import BaseRepository from "./BaseRepository";

class ChatRepository extends BaseRepository {
  constructor({ models: { Chat } }) {
    super({ Model: Chat });
    this.Chat = Chat;
  }
}

export default ChatRepository;
