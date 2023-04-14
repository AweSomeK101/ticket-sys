import React from "react";

function SupportItem({ product, issue, description, createdAt, status }) {
  return (
    <div className="supportItem">
      <div className="top">
        <div className="left">
          <p className="title">Product Type</p>
          <p>{product}</p>
        </div>
        <div className="right">
          <p className="title">Issue Type</p>
          <p>{issue}</p>
        </div>
      </div>
      <div className="top">
        <div className="left">
          <p className="title">Date</p>
          <p>{createdAt}</p>
        </div>
        <div className="right">
          <p className="title">Statuse</p>
          <p>{status}</p>
        </div>
      </div>
      <div className="desc">
        <p className="title">Issue Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SupportItem;
