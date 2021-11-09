const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus, orderCount, userCount, productCount, orderProducts, dateFilter } = require("../controllers/admin");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);
router.get("/admin/ordercount", orderCount);
router.get("/admin/usercount", userCount);
router.get("/admin/productcount", productCount);
router.get("/admin/datefilter", dateFilter);
// router.get("/admin/categorycount", catCount);
router.get("/admin/orderproducts", orderProducts);



module.exports = router;
