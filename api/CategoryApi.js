const express = require("express");
const router = express.Router();
const Category = require("../models/categoriesModel");

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json({ data: categories, message: "success" });
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({ data: category, message: "success" });
});

router.post("/", async (req, res) => {
  const category = await Category.create(req.body.name);
  res.json({ data: category, message: "success" });
});

router.put("/:id", async (req, res) => {
  const category = await Category.update(req.params.id, req.body.name);
  res.json({ data: category, message: "success" });
});

router.delete("/:id", async (req, res) => {
  const category = await Category.delete(req.params.id);
  res.json({ data: category, message: "success" });
});

module.exports = router;
