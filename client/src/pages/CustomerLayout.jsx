import React, { useEffect } from "react";
import CustomerRequests from "../components/CustomerRequests";
import NewQueryButton from "../components/NewQueryButton";
import useTicket from "../context/useTicket";

function CustomerLayout() {
  const { getTickets, userTickets } = useTicket();

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <main className="customer">
      <NewQueryButton />
      <CustomerRequests tickets={userTickets} />
    </main>
  );
}

export default CustomerLayout;
