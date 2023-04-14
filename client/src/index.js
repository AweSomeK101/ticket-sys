import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userProvider";
import { TicketProvider } from "./context/useTicket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TicketProvider>
        <App />
      </TicketProvider>
    </UserProvider>
  </React.StrictMode>
);
