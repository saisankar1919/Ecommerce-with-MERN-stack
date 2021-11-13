const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUser,
  updateName,
  updateMobile,
  getUserCart,
  emptyCart,
  saveAddress,
  createAddress,
  getAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
  deleteAddress,
  updateProfileImage,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, createAddress);
router.get("/user/getaddress", authCheck, getAddress);
router.put("/user/deleteaddress/:addid",authCheck, deleteAddress)
router.get("/user/profile/getuser",authCheck, getUser)
router.put("/user/profile/updatename",authCheck, updateName)
router.put("/user/profile/updatemobile",authCheck, updateMobile)
router.put("/user/profile/image",authCheck, updateProfileImage)


router.post("/user/order", authCheck, createOrder); // stripe
router.post("/user/cash-order", authCheck, createCashOrder); // cod
router.get("/user/orders", authCheck, orders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
