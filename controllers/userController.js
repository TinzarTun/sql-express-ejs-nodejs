const User = require("../models/userModel");

exports.index = async (_, res) => {
  // local declares
  // const users = [
  //     { id: 1, name: "Leon", email: "leon@gmail.com" },
  //     { id: 2, name: "sylus", email: "sylus@gmail.com" }
  // ]; // get all users from the database
  const users = await User.findAll(); // get all users from the database
  console.log(users);
  res.render("users/list", { users, title: "User list" }); // render to view(list.ejs)
};

exports.ShowCreateForm = (_, res) => {
  res.render("users/create", { title: "Create User" }); // render to view(create.ejs)
}

// create user (user model -> create method)
exports.create = async (req, res) => {
  const { name, email, password } = req.body; // get data from form
    await User.create(name, email, password); // create user in the database
    res.redirect("/users"); // redirect to user list
};

exports.showEditForm = async (req, res) => {
    const userId = req.params.id; // get user id from url
    const user = await User.findById(userId); // find user by id
    res.render("users/edit", { user, title: "Edit User" }); // render to view(edit.ejs)
}
 
exports.update = async (req, res) => {
    const userId = req.params.id; // get user id from url
    const { name, email } = req.body; // get data from form
    await User.update(userId, name, email); // update user in the database
    res.redirect("/users"); // redirect to user list
}

exports.delete = async (req, res) => {
    const userId = req.params.id; // get user id from url
    await User.delete(userId); // delete user from the database
    res.redirect("/users"); // redirect to user list
}
