const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/', userController.index); // /users
router.get('/create', userController.ShowCreateForm); // /users/create
router.post('/create', userController.create); // /users/create
router.get('/edit/:id', userController.showEditForm); // /users/edit/:id
router.post('/update/:id', userController.update); // /users/edit/:id
router.get('/delete/:id', userController.delete); // /users/delete/:id

module.exports = router;