import React from "react";

function TicketDetail() {
  return (
    <div className="ticket">
      <div>
        <p>Customer Username</p>
        <p className="info">username1</p>
      </div>
      <div>
        <p>Date of Submission</p>
        <p className="info">2023-04-11</p>
      </div>
      <div>
        <p>Product Type</p>
        <p className="info">Mobile Phone</p>
      </div>
      <div>
        <p>Issue Type</p>
        <p className="info">phone not charging</p>
      </div>
      <div>
        <p>Issue Description</p>
        <p className="info">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia at ipsa fugit error!
          Beatae alias quidem itaque tenetur animi nostrum magni unde laudantium cumque velit!
          Dignissimos aliquid asperiores laborum ex!
        </p>
      </div>
      <div>
        <p>Status</p>
        <p className="info">In Progress</p>
        <select name="status" id="status">
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <p>Assigned To</p>
        <p className="info">Unassigned</p>
      </div>
    </div>
  );
}

export default TicketDetail;
