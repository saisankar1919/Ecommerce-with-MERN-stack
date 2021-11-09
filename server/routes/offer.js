const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, remove, list } = require("../controllers/offer");

// routes
router.post("/offer", authCheck, adminCheck, create);
router.get("/offers", list);
router.delete("/offer/:offerId", authCheck, adminCheck, remove);

module.exports = router;
