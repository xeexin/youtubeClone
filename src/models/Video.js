import mongoose from "mongoose";
import { type } from "os";

const videoSchema = new mongoose.Schema({
  title: { type: String, requred: true },
  description: { type: String, requred: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
