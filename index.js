const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
// API
const userApi = require("./api/UserApi");
const postApi = require("./api/PostApi");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use("/api/users", userApi); // API routes
app.use("/api/posts", postApi); 
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/categories", categoriesRoutes);
app.get("/", (req, res) => {
  res.render("index", { title: "Home", name: "We're glad you're here!" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
// start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
