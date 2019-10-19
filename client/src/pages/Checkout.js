import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { StripeProvider, Elements } from "react-stripe-elements";

import CheckoutForm from "../components/CheckoutForm";

import { processPayment } from "../agent";

function Checkout({
  match: {
    params: { planId }
  }
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async data => {
    const body = {
      ...data,
      planId
    };
    setLoading(true);
    const res = await processPayment(body);
    if (res.status === 200) {
      setMessage("Thanks for the subscription");
      setLoading(false);
    }
  };
  return (
    <Container fluid style={{ lineHeight: "32px" }}>
      <Row>
        <Col md={6} offset={{ md: 3 }}>
          <div className="success">{message}</div>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
            <Elements>
              <CheckoutForm onSubmit={onSubmit} loading={loading} />
            </Elements>
          </StripeProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Checkout);
