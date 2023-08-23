const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const formidable = require('express-formidable');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, brainTreePaymentController, braintreeTokenController } = require('../controller/productController');
const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)
router.get('/get-product', getProductController);

router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', deleteProductController)

router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


module.exports = router