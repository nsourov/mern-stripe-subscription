require("dotenv").config({});
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const { toStripeAmount, toUSD } = require("../utils/format-number");

async function getAllProductsAndPlans(req, res) {
  try {
    // Get the products and plan from stripe API
    const [products, plans] = await Promise.all([
      stripe.products.list({}),
      stripe.plans.list({})
    ]);
    const sortPlans = plans.data
      .sort((a, b) => {
        // Sort plans in ascending order of price (amount)
        return a.amount - b.amount;
      })
      .map(plan => {
        // Format plan price (amount)
        amount = toUSD(plan.amount);
        return { ...plan, amount };
      });
    // This filter is to get the product which is associated with the plans we wanted to use
    products.data.forEach(product => {
      const filteredPlans = sortPlans.filter(plan => {
        return plan.product === product.id;
      });
      product.plans = filteredPlans;
    });

    return res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function createProduct(req, res) {
  const response = await stripe.products.create({
    name: req.body.productName,
    type: "service"
  });
  return res.json(response);
}

module.exports = { getAllProductsAndPlans, createProduct };
