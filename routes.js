const express = require("express");

const {
  getAllProductsAndPlans,
  createProduct,
  createPlan,
  createCustomerAndSubscription
} = require("./controller/stripe");

const router = express.Router();

// Place all routes here
router.get("/", getAllProductsAndPlans);

// Create Product
router.post("/createProduct", createProduct);

// Create Plan
router.post("/createPlan", createPlan);

// Process the subscription
router.post("/processPayment", createCustomerAndSubscription);

module.exports = router;
