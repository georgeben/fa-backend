import Talk from "domain/entities/Talk";
import mongoose from "mongoose";

const talkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  durationInMinutes: {
    type: Number,
  },
  speakerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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

talkSchema.virtual("speaker", {
  ref: "Speaker",
  localField: "speakerId",
  foreignField: "_id",
  justOne: true,
});

talkSchema.loadClass(Talk);

export default mongoose.model("Talk", talkSchema);
