import useSessionStorage from "../hooks/useSessionStorage";
import TicketTable from "../components/TicketTable";
import { useEffect } from "react";
import useTicket from "../context/useTicket";
import useUser from "../context/userProvider";

function EmployeeLayout() {
  const [taskView, setTaskView] = useSessionStorage("taskView", 0);
  const { getTickets } = useTicket();
  const { user } = useUser();

  useEffect(() => {
    getTickets();
  }, []);

  function handleViewChange(val) {
    if (val === taskView) return;
    setTaskView(val);
  }

  return (
    <main className="employee container">
      <div className="employeeNav">
        {user.isAdmin ? (
          <>
            <p
              className={`${taskView === 0 ? "active" : null}`}
              onClick={() => handleViewChange(0)}
            >
              Unallocated Task
            </p>
            <p
              className={`${taskView === 1 ? "active" : null}`}
              onClick={() => handleViewChange(1)}
            >
              Allocated Task
            </p>{" "}
          </>
        ) : (
          <p>Allocated Task</p>
        )}
      </div>

      {/* {taskView === 0 ? <TicketTable taskView={taskView} /> : <TicketTable taskView={taskView} />} */}
      {!user.isAdmin ? (
        <TicketTable taskView={1} />
      ) : taskView === 0 ? (
        <TicketTable taskView={taskView} />
      ) : (
        <TicketTable taskView={taskView} />
      )}
    </main>
  );
}

export default EmployeeLayout;
