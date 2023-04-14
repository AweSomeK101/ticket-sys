import React, { useEffect, useState } from "react";
import useUser from "../context/userProvider";
import useTicket from "../context/useTicket";
import { useParams } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function TicketDetail({
  customer,
  createdAt,
  product,
  policy,
  issue,
  description,
  status,
  assigned,
}) {
  const { user, getAllEmp } = useUser();
  const { updateTicket } = useTicket();
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [tempStatus, setStatus] = useState("");
  const [tempAssign, setAssign] = useState("");

  console.log(tempAssign);

  useEffect(() => {
    (async function setup() {
      if (user.isAdmin) {
        const emp = await getAllEmp();
        setEmployees(emp);
      }
    })();
  }, []);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  useEffect(() => {
    setAssign(assigned);
  }, [assigned]);

  async function handleStatus(e) {
    setStatus(e.target.value);
    await updateTicket(id, { status: e.target.value }, (err) => {
      if (err) alert(err);
    });
  }
  async function handleAssign(e) {
    setAssign(e.target.value);
    await updateTicket(id, { assigned: e.target.value }, (err) => {
      if (err) {
        return alert(err);
      }
    });
  }

  return (
    <div className="ticket">
      <div>
        <p>Customer Username</p>
        <p className="info">{customer}</p>
      </div>
      <div>
        <p>Date of Submission</p>
        <p className="info">{createdAt}</p>
      </div>
      <div>
        <p>Product Type</p>
        <p className="info">{product}</p>
      </div>
      <div>
        <p>Issue Type</p>
        <p className="info">{issue}</p>
      </div>
      <div>
        <p>Issue Description</p>
        <p className="info">{description}</p>
      </div>
      <div>
        <p>Policy</p>
        <p className="info">
          <a
            href={`${baseUrl}/policy/${policy}`}
            style={{ textDecoration: "underline" }}
            target="_blank"
            rel="noopener"
          >
            {policy}
          </a>
        </p>
      </div>
      <div>
        <p>Status</p>
        {user.isAdmin ? (
          <p className="info">{status}</p>
        ) : (
          <select name="status" id="status" value={tempStatus} onChange={handleStatus}>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        )}
      </div>
      <div>
        <p>Assigned To</p>
        {user.isAdmin ? (
          <select name="assign" id="assign" value={tempAssign} onChange={handleAssign}>
            {employees &&
              employees.map((emp) => (
                <option value={emp.username} key={emp._id}>
                  {emp.username}
                </option>
              ))}
            {assigned === "" && <option value="">{}</option>}
          </select>
        ) : (
          <p className="info">{assigned}</p>
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
