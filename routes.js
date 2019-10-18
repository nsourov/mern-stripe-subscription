const express = require("express");

const {
  getAllProductsAndPlans,
  createProduct
} = require("./controller/stripe");

const router = express.Router();

/* Place all routes here */
router.get("/", getAllProductsAndPlans);

/* Create Product */
router.post("/createProduct", createProduct);

module.exports = router;
