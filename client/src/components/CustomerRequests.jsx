import React from "react";
import SupportItem from "./SupportItem";

function CustomerRequests({ tickets }) {
  console.log(tickets);
  return (
    <div className="customerReqContainer">
      <h3>Your Support Requests</h3>
      {tickets.map((ticket) => (
        <SupportItem {...ticket} key={ticket._id} />
      ))}
    </div>
  );
}

export default CustomerRequests;
