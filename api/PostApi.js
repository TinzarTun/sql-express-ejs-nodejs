const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  res.json({ data: posts, message: "success" });
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json({ data: post, message: "success" });
});

router.post("/", async (req, res) => {
  const post = await Post.create(
    req.body.user_id,
    req.body.title,
    req.body.content,
    req.body.photo || null
  );
  res.json({ data: post, message: "success" });
});

router.put("/:id", async (req, res) => {
  const post = await Post.update(
    req.params.id,
    req.body.title,
    req.body.content
  );
  res.json({ data: post, message: "success" });
});

router.delete("/:id", async (req, res) => {
  const post = await Post.delete(req.params.id);
  res.json({ data: post, message: "success" });
});

module.exports = router;
