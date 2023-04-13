import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SupportForm from "../components/SupportForm";

function NewRequestLayout() {
  const navigate = useNavigate();

  return (
    <main className="newRequest container">
      <div onClick={() => navigate(-1)} to="/dashboard/u/" className="backBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <p>Back</p>
      </div>
      <h3 className="sectionTitle">Create new support request</h3>
      <SupportForm />
    </main>
  );
}

export default NewRequestLayout;
