import useUser from "./userProvider";

const { createContext, useState, useContext } = require("react");

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [unAssignedTickets, setUnassignedTickets] = useState([]);
  const { user, token } = useUser();

  async function getTickets() {
    if (!user) return null;
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

    if (user.role === "user") {
      fetch(`${baseUrl}/api/ticket`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setTickets(data));
    } else if (user.role === "employee") {
      fetch(`${baseUrl}/api/ticket`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (user.isAdmin) {
            setAssignedTickets(data.assignedTickets);
            setUnassignedTickets(data.unAssignedTickets);
          } else {
            setAssignedTickets(data.assignedTickets);
          }
        });
    }
  }

  async function createTicket(data, cb) {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    fetch(`${baseUrl}/api/ticket`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`);
        }
        res.json();
      })
      .then((data) => {
        // console.log(data);
        // setTickets([data, ...tickets]);
        cb(null);
      })
      .catch((error) => {
        console.log(error);
        cb(error);
      });
  }

  async function updateTicket(id, data, cb) {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/ticket/${id}`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return cb(res.status + " " + res.statusText);
    }
    cb(false);
  }

  async function getTicket(id) {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/ticket/${id}`, {
      headers: { Authorization: token },
    });
    if (!res.ok) throw new Error("error fetching ticket data");
    return res.json();
  }

  return (
    <TicketContext.Provider
      value={{
        userTickets: tickets,
        employeeTickets: { assignedTickets, unAssignedTickets },
        createTicket,
        getTickets,
        getTicket,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export default function useTicket() {
  return useContext(TicketContext);
}
