function toUSD(stripeAmount) {
  return `$${(stripeAmount / 100).toFixed(2)}`;
}

function toStripeAmount(USDString) {
  return parseFloat(USDString) * 100;
}

module.exports = {
  toUSD,
  toStripeAmount
};
