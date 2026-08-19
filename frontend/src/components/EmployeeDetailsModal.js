function EmployeeDetailsModal({
  selectedEmployee,
  setSelectedEmployee,
  setNewEmployee,
  setEditingId,
  setShowAddModal,
  setEmployeeToDelete,
}) {
  if (!selectedEmployee) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2 className="modal-title">
          👤 Employee Profile
        </h2>

        <p>
          <strong>Name</strong>
          <br />
          {selectedEmployee.name}
        </p>

        <p>
          <strong>Department</strong>
          <br />
          {selectedEmployee.department}
        </p>

        <p>
          <strong>Role</strong>
          <br />
          {selectedEmployee.role}
        </p>

        <p>
          <strong>Status</strong>
          <br />

          <span
            className={
              selectedEmployee.status === "Active"
                ? "status-active"
                : "status-inactive"
            }
          >
            {selectedEmployee.status}
          </span>
        </p>

        <p>
          <strong>Salary</strong>
          <br />
          ₹ {Number(selectedEmployee.salary).toLocaleString()}
        </p>

        <button
          className="edit-btn"
          onClick={() => {
            setNewEmployee({
              name: selectedEmployee.name,
              department: selectedEmployee.department,
              role: selectedEmployee.role,
              salary: selectedEmployee.salary,
              status: selectedEmployee.status,
            });

            setEditingId(selectedEmployee.id);

            setSelectedEmployee(null);

            setShowAddModal(true);
          }}
        >
          Edit Employee
        </button>

        <button
          className="delete-btn"
          onClick={() => {
            setEmployeeToDelete(selectedEmployee);

            setSelectedEmployee(null);
          }}
        >
          Delete Employee
        </button>

        <button
          className="close-btn"
          onClick={() => setSelectedEmployee(null)}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default EmployeeDetailsModal;