const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();
router.get("/", postController.index); // /posts
router.get("/create", postController.showCreateForm); // /posts/create
router.post("/create", postController.create); // /posts/create
router.get("/edit/:id", postController.showEditForm); // /posts/edit/:id
router.post("/update/:id", postController.update); // /posts/edit/:id
router.post("/delete/:id", postController.delete); // /posts/delete/:id

module.exports = router;
