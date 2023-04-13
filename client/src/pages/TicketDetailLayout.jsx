import React from "react";
import { useNavigate } from "react-router-dom";
import TicketDetail from "../components/TicketDetail";

function TicketDetailLayout() {
  const navigate = useNavigate();

  return (
    <main className="ticketDetail container">
      <div onClick={() => navigate(-1)} to="/dashboard/e/" className="backBtn">
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
      <h3 className="sectionTitle">Ticket Details</h3>
      <TicketDetail />
    </main>
  );
}

export default TicketDetailLayout;
