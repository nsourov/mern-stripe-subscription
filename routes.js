const express = require("express");

const { getAllProductsAndPlans } = require("./controller/stripe");

const router = express.Router();

router.get("/", getAllProductsAndPlans);

module.exports = router;
