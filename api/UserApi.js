const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
router.get("/", async (req, res) => { 
    const users = await User.findAll(); // get all users from the database
    res.json({data:users,message:"success"}); // return users as JSON response
})

router.get("/:id", async (req, res) => {
    const user =await User.findById(req.params.id); // find user by id
    res.json({data:user,message:"success"}); // return user as JSON response
})
 
router.post("/", async (req, res) => { 
    const user = await User.create(req.body.name, req.body.email, req.body.password); // create user in the database
    res.json({data:user,message:"success"}); // return created user as JSON response
})

router.put("/:id", async (req, res) => { 
    const user = await User.update(req.params.id, req.body.name, req.body.email); // update user in the database
    res.json({data:user,message:"success"}); // return updated user as JSON response
})

router.delete("/:id", async (req, res) => {
    const user = await User.delete(req.params.id); // delete user from the database
    res.json({ data: user, message: "success" }); // return success message as JSON response
})

module.exports = router; // export the router