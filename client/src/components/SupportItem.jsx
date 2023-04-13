import React from "react";

function SupportItem() {
  return (
    <div className="supportItem">
      <div className="top">
        <div className="left">
          <p className="title">Product Type</p>
          <p>Whashing Machine</p>
        </div>
        <div className="right">
          <p className="title">Issue Type</p>
          <p>Motor not working</p>
        </div>
      </div>
      <div className="desc">
        <p className="title">Issue Description</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae similique
          ipsam laborum esse nesciunt, dolores quas possimus natus qui sint repellendus omnis modi
          minima sit! Quod facilis iste voluptate.
        </p>
      </div>
    </div>
  );
}

export default SupportItem;
