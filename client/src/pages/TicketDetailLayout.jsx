import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData, useNavigate } from "react-router-dom";
import TicketDetail from "../components/TicketDetail";

function TicketDetailLayout() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();

  return (
    <main className="ticketDetail container">
      <Link to="/dashboard/e/" className="backBtn">
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
      <h3 className="sectionTitle">Ticket Details</h3>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={loaderData.ticket} errorElement={<p>Could not load ticket data</p>}>
          {(ticket) => {
            console.log("ticketData", ticket);
            return <TicketDetail {...ticket} />;
          }}
        </Await>
      </Suspense>
    </main>
  );
}

export const ticketLoader = (getTicket) =>
  async function ({ params }) {
    return defer({ ticket: getTicket(params.id) });
  };

export default TicketDetailLayout;
