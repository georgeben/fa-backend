import Speaker from "domain/entities/Speaker";
import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  professionalTitle: String,
  company: String,
  bio: String,
  socials: {
    linkedin: String,
    twitter: String,
  },
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

speakerSchema.loadClass(Speaker);

export default mongoose.model("Speaker", speakerSchema);
