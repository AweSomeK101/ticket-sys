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
import TicketDetailLayout from "./pages/TicketDetailLayout";
import useUser from "./context/userProvider";

function App() {
  const { login } = useUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} action={loginAction(login)}>
        <Route index element={<LoginLayout />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="u" element={<CustomerLayout />} />
          <Route path="u/new_request" element={<NewRequestLayout />} />
          <Route path="e" element={<EmployeeLayout />} />
          <Route path="e/ticket" element={<TicketDetailLayout />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
