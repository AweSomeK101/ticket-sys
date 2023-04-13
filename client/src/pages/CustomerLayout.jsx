import React from "react";
import CustomerRequests from "../components/CustomerRequests";
import NewQueryButton from "../components/NewQueryButton";

function CustomerLayout() {
  return (
    <main className="customer">
      <NewQueryButton />
      <CustomerRequests />
    </main>
  );
}

export default CustomerLayout;
