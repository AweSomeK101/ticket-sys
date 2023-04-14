import React from "react";
import { Link } from "react-router-dom";
import useTicket from "../context/useTicket";

function TicketTable({ taskView }) {
  const { employeeTickets } = useTicket();
  const tickets =
    taskView === 0 ? employeeTickets.unAssignedTickets : employeeTickets.assignedTickets;

  return (
    <table className="ticketTable">
      <thead>
        <tr>
          {taskView === 0 ? <th>Customer username</th> : <th>Employee username</th>}

          <th>Product type</th>
          <th>Issue type</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{taskView === 0 ? ticket.customer : ticket.assigned}</td>
            <td>{ticket.product}</td>
            <td>{ticket.issue}</td>
            <td>{ticket.createdAt}</td>
            <td className="detailBtn">
              <Link to={`ticket/${ticket._id}`}>More Detail</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketTable;
