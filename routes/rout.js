const express = require('express')
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } = require("../controller/authController");
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')


const router = express.Router()


router.post('/register', registerController)

//login
router.post('/login', loginController)

router.get("/test", requireSignIn, isAdmin, testController);
//forgot password
router.post('/forgot-password', forgotPasswordController);

//protected rout for authentication
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrdersController)

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// order status update
router.put(
    "/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

module.exports = router