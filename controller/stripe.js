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
  try {
    // REF: https://stripe.com/docs/api/products/create
    const response = await stripe.products.create({
      name: req.body.productName,
      type: "service"
    });
    return res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function createPlan(req, res) {
  try {
    // REF: https://stripe.com/docs/api/plans/create
    const response = await stripe.plans.create({
      nickname: req.body.planName,
      amount: toStripeAmount(req.body.planAmount),
      interval: req.body.planInterval,
      interval_count: parseInt(req.body.planIntervalNumber),
      product: req.body.productId,
      currency: "USD"
    });
    return res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function createCustomerAndSubscription(req, res) {
  try {
    const customer = await stripe.customers.create({
      source: req.body.stripeToken,
      email: req.body.customerEmail
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: req.body.planId
        }
      ]
    });
    return res.json(subscription);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  getAllProductsAndPlans,
  createProduct,
  createPlan,
  createCustomerAndSubscription
};
