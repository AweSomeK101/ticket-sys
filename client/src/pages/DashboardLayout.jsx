import React from 'react'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div>
        <div className="header">
            <button className="logoutBtn">Logout</button>
        </div>
        <Outlet />
    </div>
  )
}

export default DashboardLayout