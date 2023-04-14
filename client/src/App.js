import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import LoginLayout, { loginAction } from "./pages/LoginLayout";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import DashboardLayout from "./pages/DashboardLayout";
import CustomerLayout from "./pages/CustomerLayout";
import NewRequestLayout from "./pages/NewRequestLayout";
import EmployeeLayout from "./pages/EmployeeLayout";
import TicketDetailLayout, { ticketLoader } from "./pages/TicketDetailLayout";
import useUser from "./context/userProvider";
import useTicket from "./context/useTicket";

function App() {
  const { login } = useUser();
  const { getTicket } = useTicket();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} action={loginAction(login)}>
        <Route index element={<LoginLayout />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="u" element={<CustomerLayout />} />
          <Route path="u/new_request" element={<NewRequestLayout />} />
          <Route path="e" element={<EmployeeLayout />} />
          <Route
            path="e/ticket/:id"
            element={<TicketDetailLayout />}
            loader={ticketLoader(getTicket)}
          />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
