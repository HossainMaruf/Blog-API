const router = require("express").Router();
const path = require("path");
const multer = require("multer");
// Get the model
const Post = require("../models/Post");
const User = require("../models/User");

// initialize multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    // console.log("filename", file)
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// create a post
router.post("/create", upload.array("file"), async function (req, res, next) {
  // console.log(req.body);
  // console.log(req.files);
  /**
   * upload.array bind files to req.files
   * upload.single bind file to req.file
   * rest of the fields will be found in req.body
   */
  const imageFiles = [];
  const pdfFiles = [];
  req.files.forEach(function (file) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      imageFiles.push(file.filename);
    } else if (file.mimetype === "application/pdf") {
      pdfFiles.push(file.filename);
    }
  });
  // console.log(imageFiles);
  // console.log(pdfFiles);
  req.body.imageFiles = imageFiles;
  req.body.pdfFiles = pdfFiles;
  const newPost = new Post(req.body);
  try {
    const createdPost = await newPost.save();
    return res.status(200).json(createdPost);
  } catch (error) {
    return res.status(500).json("Post was not created.");
  }
});

// delete a post by postID
router.delete("/:postID", async function (req, res, next) {
  try {
    await Post.deleteOne({ _id: req.params.postID });
    return res.status(200).json("Post has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});

// update a post by postID
router.put("/:postID", async function (req, res, next) {
  // console.log(req.params.postID, req.body);
  try {
    const post = await Post.findById(req.params.postID);
    if (post.userID === req.body.userID) {
      await post.updateOne({ $set: req.body });
      const updatedPost = await Post.findById(req.params.postID);
      return res
        .status(200)
        .json({ post: updatedPost, message: "Post has been updated" });
      // return res.status(200).json(updatedPost);
    } else {
      return res.status(403).json("You can update only your post");
    }
  } catch (error) {
    return res.status(500).json("Unable to update the post");
  }
});

// like dislike in a post
router.post("/:postID/like", async function (req, res, next) {
  const userID = req.body.userID;
  let post = await Post.findOne({ _id: req.params.postID });
  if (post) {
    // post exists
    if (post.likes.includes(userID)) {
      // already liked so we need to dislike
      await post.updateOne({ $pull: { likes: userID } });
      post = await Post.findOne({ _id: req.params.postID });
      return res.status(200).json({
        reactedPost: post,
        message: "Post has been disliked",
      });
    } else {
      // user want to like the post
      await post.updateOne({ $push: { likes: userID } });
      post = await Post.findOne({ _id: req.params.postID });
      return res
        .status(200)
        .json({ reactedPost: post, message: "Post has been liked" });
    }
  } else {
    return res.status(404).json("Post not found");
  }
});

// get all posts in collection
router.get("/", async function (req, res, next) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json("Something went wrong.");
  }
});

// get a single post based on post id
router.get("/:postID", async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.postID);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json("Post not found.");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong.");
  }
});

// get all posts of a user
router.get("/user/:userID", async function (req, res, next) {
  try {
    const posts = await Post.find({ userID: req.params.userID }).sort({
      createdAt: -1,
    });
    if (posts.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json("No post of this user");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong.");
  }
});

/**
 * TODO: comment
 * TODO: shares counter
 */
module.exports = router;
