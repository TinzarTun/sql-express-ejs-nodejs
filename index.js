const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const userApi = require("./api/UserApi");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use("/api/users", userApi); // API routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
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
