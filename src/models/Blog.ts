import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    content: { type: String, required: true },
    thumbnail: {
      url: { type: String, required: true },
      imageKey: { type: String, default: "" },
    },
  },
  { timestamps: true }
);
export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);