const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      if (req.body.title) {
        const posts = await Post.find(req.body.title)
          .sort({ createdAt: "desc" })
          .lean();
        res.render("feed.ejs", { posts: posts, results: false });
      } else {
        const posts = await Post.find().sort({ createdAt: "desc" }).lean();
        res.render("feed.ejs", { posts: posts, results: false });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      // console.log("This is the result");
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        location: req.body.location,
        contactInfo: req.body.contactInfo,
        subject: req.body.subject,
        courseNumber: req.body.courseNumber,
        cost: req.body.cost,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      // alert(err);
      // for now if no image is uploaded, will just redirect back instead of crashing. need to get an error message displayed if this happens.
      res.redirect("/profile");
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  getSearch: async (req, res) => {
    try {
      const query = req.query.nameBook;

      let search = await Post.find({
        $text: {
          $search: query,
        },
      });
      res.render("listSearch.ejs", { search });
    } catch (err) {
      console.log(err);
    }
  },
};
