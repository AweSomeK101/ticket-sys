import React from "react";
import { Link, redirect } from "react-router-dom";
import SupportForm from "../components/SupportForm";

function NewRequestLayout() {
  return (
    <main className="newRequest container">
      <Link to="/dashboard/u/" className="backBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <p>Back</p>
      </Link>
      <h3 className="sectionTitle">Create new support request</h3>
      <SupportForm />
    </main>
  );
}

export default NewRequestLayout;
