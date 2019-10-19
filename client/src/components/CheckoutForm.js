import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";

// You can customize your Elements to give it the look and feel of your site.
const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

function CheckoutForm(props) {
  const [errorMessage, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = ({ error }) => {
    if (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const token = await props.stripe.createToken();
    if (token.error) {
      setError(token.error.message);
    } else {
      props.onSubmit({
        stripeToken: token.token.id,
        customerEmail: email
      });
    }
  };
  return (
    <div className="CheckoutForm">
      <form onSubmit={handleSubmit}>
        <div className="split-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              id=""
              placeholder="john@example.com"
              style={{ width: "100%" }}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="split-form">
          <label>
            Card number
            <CardNumberElement {...createOptions()} onChange={handleChange} />
          </label>
          <label>
            Expiration date
            <CardExpiryElement {...createOptions()} onChange={handleChange} />
          </label>
        </div>
        <div className="split-form">
          <label>
            CVC
            <CardCVCElement {...createOptions()} onChange={handleChange} />
          </label>
        </div>
        <div className="error" role="alert">
          {errorMessage}
        </div>
        <button>{props.loading ? "Processing payment" : "Pay"}</button>
      </form>
    </div>
  );
}

const CardForm = injectStripe(CheckoutForm);
export default CardForm;
