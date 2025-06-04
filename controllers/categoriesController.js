const Category = require("../models/categoriesModel");

exports.index = async (_, res) => {
  const categories = await Category.findAll();
  console.log(categories);
  res.render("categories/list", { categories, title: "Category list" });
};

exports.ShowCreateForm = (_, res) => {
  res.render("categories/create", { title: "Create Category" });
};

exports.create = async (req, res) => {
  const name = req.body.name;
  await Category.create(name);
  res.redirect("/categories");
};

exports.showEditForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  res.render("categories/edit", { category, title: "Edit Category" });
};

exports.update = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  await Category.update(categoryId, name);
  res.redirect("/categories");
};

exports.delete = async (req, res) => {
  const categoryId = req.params.id;
  await Category.delete(categoryId);
  res.redirect("/categories");
};
