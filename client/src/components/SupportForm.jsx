import React from "react";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import useTicket from "../context/useTicket";

const PRODUCT_TYPE = ["Mobile Phone", "Washing Machine", "TV", "Refrigerator"];
const ISSUE_TYPE = {
  "Mobile Phone": ["Broken Screen", "Faulty Camera", "Overheating Issue"],
  TV: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"],
  Refrigerator: ["Panel Controls Broken", "Compressor Not Working", "Unable To Turn On"],
  "Washing Machine": ["Water overflowing", "Motor not working"],
};

function SupportForm() {
  const [selectedProduct, setSelectedProduct] = useState("Mobile Phone");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { createTicket } = useTicket();

  function handleProductChange(e) {
    setSelectedProduct(e.target.value);
  }

  function checkFileSize(e) {
    if (e.target.files[0].size > 2097152) {
      alert("File is too big!");
      e.target.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    var formData = new FormData(e.target);
    await createTicket(formData, (err) => {
      if (err) {
        alert(err.message);
      } else {
        console.log("success");
      }
    });
    setSubmitting(false);
    navigate("/dashboard/u");
  }

  return (
    <form className="Form" onSubmit={handleSubmit} disabled={submitting}>
      <div>
        <p>Product Type</p>
        <select name="product" id="product" onChange={handleProductChange} value={selectedProduct}>
          {PRODUCT_TYPE.map((p) => (
            <option value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Issue Type</p>
        <select name="issue" id="issue" defaultValue={ISSUE_TYPE[selectedProduct][0]}>
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
        <textarea name="description" id="description"></textarea>
      </div>
      <button className="FormBtn" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

export default SupportForm;
