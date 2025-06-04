const Post = require("../models/postModel");
const User = require("../models/userModel");
const multer = require("multer");
const path = require("path"); // add this to handle file extensions

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
// cat.png
//cat_1634567890123.png
const upload = multer({ storage: storage }).single("photo");

exports.index = async (req, res) => {
  try {
    const posts = await Post.findAll();
    console.log(posts);
    res.render("posts/list", { posts, title: "Post List" }); // view file (list.ejs)
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Server Error");
  }
};

exports.showCreateForm = async (_req, res) => {
  try {
    const users = await User.findAll();
    res.render("posts/create", { users, title: "Create New Post" }); // view file (create.ejs)
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading photo:", err);
      return res.status(500).send("Error uploading photo");
    }
    const { user_id, title, content } = req.body;
    const photo = req.file ? req.file.filename : null; // Use the uploaded file name
    try {
      await Post.create(user_id, title, content, photo); // Save the photo filename to the database
      res.redirect("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).send("Server Error");
    }
  });
};

exports.showEditForm = async (req, res) => { 
    try {
        const post = await Post.findById(req.params.id);
        const users = await User.findAll();
        res.render("posts/edit", { post, users, title: "Edit Post" }); // view file (edit.ejs)
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Server Error");
    }
}

exports.update = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading photo:", err);
      return res.status(500).send("Error uploading photo");
    }
    const { title, content } = req.body;
    const photo = req.file ? req.file.filename : null; // Use the uploaded file name
    try {
      await Post.update(req.params.id, title, content, photo); // Save the photo filename to the database
      res.redirect("/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).send("Server Error");
    }
  });
}

exports.delete = async (req, res) => {
  try {
    await Post.delete(req.params.id);
    res.redirect("/posts");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Server Error");
  }
};