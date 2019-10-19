import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";

import { getPlans } from "../agent";

import Plan from "../components/Plan";

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const result = await getPlans();
      setPlans(result);
    };
    fetchPlans();
  }, []);

  return (
    <Container fluid style={{ lineHeight: "32px" }}>
      <h1>Our Packages</h1>
      <Row align="start" style={{ height: "75px" }}>
        {plans.map(plan => (
          <Col key={plan.id} >
            <Plan plan={plan} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Plans;
