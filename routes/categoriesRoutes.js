const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();
router.get("/", categoriesController.index); // /categories
router.get("/create", categoriesController.ShowCreateForm); // /categories/create
router.post("/create", categoriesController.create); // /categories/create
router.get("/edit/:id", categoriesController.showEditForm); // /categories/edit/:id
router.post("/update/:id", categoriesController.update); // /categories/edit/:id
router.get("/delete/:id", categoriesController.delete); // /categories/delete/:id

module.exports = router;
