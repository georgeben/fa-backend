import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  talks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talk" }],
  photoUrl: String,
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

export default mongoose.model("Attendee", attendeeSchema);
