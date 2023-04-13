import React from "react";
import { Link } from "react-router-dom";

function TicketTable({ taskView }) {
  return (
    <table className="ticketTable">
      <thead>
        <tr>
          {taskView == 0 ? <th>Customer username</th> : <th>Employee username</th>}

          <th>Product type</th>
          <th>Issue type</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>username1</td>
          <td>Mobile Phone</td>
          <td>Phone not charging</td>
          <td>2023-04-11</td>
          <td className="detailBtn">
            <Link to="ticket">More Detail</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TicketTable;
