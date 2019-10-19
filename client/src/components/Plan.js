import React from "react";
import { Link } from "react-router-dom";

function Plan({ plan }) {
  return (
    <div className="plan">
      <div className="title">{plan.nickname}</div>
      <div>
        <span className="price">{plan.amount}</span>/
        <span className="interval">{plan.interval}</span>
        {/* List of meta */}
      </div>
      <Link to={plan.id}>
        <button>Subscribe</button>
      </Link>
    </div>
  );
}

export default Plan;
