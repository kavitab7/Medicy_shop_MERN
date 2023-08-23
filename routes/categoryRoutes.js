const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controller/categoryController');


const router = express.Router();

//routes

//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
//update
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//getall
router.get('/get-category', categoryController);
//get one 
router.get('/single-category/:slug', singleCategoryController);

//delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

module.exports = router
