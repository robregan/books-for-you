const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  //  required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  //  required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
 //   required: true,
  },
  contactInfo: {
    type: String,
 //   required: true,
  },
  subject: {
    type: String,
 //   required: true,
  },
  courseNumber: {
    type: String,
  },
  cost: {
    type: Number,
 //   required: true,
  },
});

PostSchema.index({ title: 'text' })

module.exports = mongoose.model("Post", PostSchema);