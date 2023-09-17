import mongoose from "mongoose";
import { type } from "os";

const videoSchema = new mongoose.Schema({
  title: { type: String, requred: true, trim: true, maxLength: 20 },
  description: { type: String, requred: true, trim: true, maxLength: 50 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
