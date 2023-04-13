import React from "react";
import { useState } from "react";
import { Form } from "react-router-dom";

const PRODUCT_TYPE = ["Mobile Phone", "Washing Machine", "TV", "Refrigerator"];
const ISSUE_TYPE = {
  "Mobile Phone": ["Broken Screen", "Faulty Camera", "Overheating Issue"],
  TV: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
  Refrigerator: ["Panel Controls Broken", "Compressor Not Working", "Unable To Turn On"],
  "Washing Machine": ["Water overflowing", "Motor not working"],
};

function SupportForm() {
  const [selectedProduct, setSelectedProduct] = useState("Mobile Phone");

  function handleProductChange(e) {
    setSelectedProduct(e.target.value);
  }

  function checkFileSize(e) {
    if (e.target.files[0].size > 2097152) {
      alert("File is too big!");
      e.target.value = "";
    }
  }

  return (
    <Form className="Form">
      <div>
        <p>Product Type</p>
        <select
          name="productType"
          id="productType"
          onChange={handleProductChange}
          value={selectedProduct}
        >
          {PRODUCT_TYPE.map((p) => (
            <option value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Issue Type</p>
        <select name="issueType" id="issueType" defaultValue={ISSUE_TYPE[selectedProduct][0]}>
          {ISSUE_TYPE[selectedProduct].map((p) => (
            <option value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Policy Upload</p>
        <input
          type="file"
          name="policy"
          id="policy"
          required
          onChange={checkFileSize}
          accept=".pdf, .doc, .docx, .jpg, .png"
        />
      </div>
      <div>
        <p>Issue Description</p>
        <textarea name="issueDesc" id="issueDesc"></textarea>
      </div>
      <button className="FormBtn">Submit Request</button>
    </Form>
  );
}

export default SupportForm;
