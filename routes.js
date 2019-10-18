const express = require("express");

const {
  getAllProductsAndPlans,
  createProduct,
  createPlan
} = require("./controller/stripe");

const router = express.Router();

// Place all routes here
router.get("/", getAllProductsAndPlans);

// Create Product
router.post("/createProduct", createProduct);

// Create Plan
router.post("/createPlan", createPlan);

module.exports = router;
