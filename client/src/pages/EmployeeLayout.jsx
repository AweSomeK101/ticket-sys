import useSessionStorage from "../hooks/useSessionStorage";
import TicketTable from "../components/TicketTable";

function EmployeeLayout() {
  const [taskView, setTaskView] = useSessionStorage("taskView", 0);

  function handleViewChange(val) {
    if (val === taskView) return;
    setTaskView(val);
  }

  return (
    <main className="employee container">
      <div className="employeeNav">
        <p className={`${taskView === 0 ? "active" : null}`} onClick={() => handleViewChange(0)}>
          Unallocated Task
        </p>
        <p className={`${taskView === 1 ? "active" : null}`} onClick={() => handleViewChange(1)}>
          Allocated Task
        </p>
      </div>

      {taskView == 0 ? <TicketTable taskView={taskView} /> : <TicketTable taskView={taskView} />}
    </main>
  );
}

export default EmployeeLayout;
