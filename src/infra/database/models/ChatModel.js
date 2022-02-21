import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendee",
  },
  text: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Talk",
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
    retainKeyOrder: true,
  },
  toJSON: {
    virtuals: true,
  },
});

export default mongoose.model("Chat", chatSchema);
