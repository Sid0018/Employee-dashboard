function DashboardCards({
  totalEmployees,
  activeEmployees,
  inactiveEmployees,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="dashboard-cards">

      <div
        className={`card dashboard-card ${
          statusFilter === "" ? "selected-card" : ""
        }`}
        onClick={() => setStatusFilter("")}
      >
        <div className="card-icon total-icon">
          👥
        </div>

        <div className="card-content">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
          <span>View all employees</span>
        </div>
      </div>

      <div
        className={`card dashboard-card ${
          statusFilter === "Active" ? "selected-card" : ""
        }`}
        onClick={() => setStatusFilter("Active")}
      >
        <div className="card-icon active-icon">
          ✓
        </div>

        <div className="card-content">
          <h3>Active</h3>
          <p>{activeEmployees}</p>
          <span>View active employees</span>
        </div>
      </div>

      <div
        className={`card dashboard-card ${
          statusFilter === "Inactive" ? "selected-card" : ""
        }`}
        onClick={() => setStatusFilter("Inactive")}
      >
        <div className="card-icon inactive-icon">
          ⏸
        </div>

        <div className="card-content">
          <h3>Inactive</h3>
          <p>{inactiveEmployees}</p>
          <span>View inactive employees</span>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;