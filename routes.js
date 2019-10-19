const express = require("express");

const {
  getPlans,
  createProduct,
  createPlan,
  createCustomerAndSubscription
} = require("./controller/stripe");

const router = express.Router();

// Place all routes here
router.get("/", getPlans);

// Create Product
router.post("/createProduct", createProduct);

// Create Plan
router.post("/createPlan", createPlan);

// Process the subscription
router.post("/processPayment", createCustomerAndSubscription);

module.exports = router;
