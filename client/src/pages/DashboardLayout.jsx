import React, { useEffect, useState } from "react";
import useUser from "../context/userProvider";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [loading, setLoading] = useState(false);
  const { token, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  });

  async function handleLogout() {
    setLoading(true);
    await logout((err) => {
      if (err) {
        alert(err);
      }
    });
    setLoading(false);
  }

  return (
    <div>
      <div className="header">
        <button className="logoutBtn" onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
