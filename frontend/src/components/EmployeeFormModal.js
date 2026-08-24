function EmployeeFormModal({
  showAddModal,
  editingId,
  newEmployee,
  setNewEmployee,
  addEmployee,
  updateEmployee,
  setShowAddModal,
  formError,
  setFormError,
  saving,
}) {
  if (!showAddModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingId ? "Edit Employee" : "Add Employee"}
        </h2>

        {/* Validation Error */}
        {formError && (
          <p className="form-error">
            {formError}
          </p>
        )}

        {/* Employee Name */}
        <input
          type="text"
          placeholder="Employee Name"
          value={newEmployee.name}
          onChange={(e) => {
            setNewEmployee({
              ...newEmployee,
              name: e.target.value,
            });

            setFormError("");
          }}
        />

        {/* Department */}
        <select
          value={newEmployee.department}
          onChange={(e) => {
            setNewEmployee({
              ...newEmployee,
              department: e.target.value,
            });

            setFormError("");
          }}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        {/* Role */}
        <input
          type="text"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) => {
            setNewEmployee({
              ...newEmployee,
              role: e.target.value,
            });

            setFormError("");
          }}
        />

        {/* Salary */}
        <input
          type="number"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={(e) => {
            setNewEmployee({
              ...newEmployee,
              salary: e.target.value,
            });

            setFormError("");
          }}
        />

        {/* Status */}
        <select
          value={newEmployee.status}
          onChange={(e) => {
            setNewEmployee({
              ...newEmployee,
              status: e.target.value,
            });

            setFormError("");
          }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Save / Update Button */}
        <button
          className="close-btn"
          disabled={saving}
          onClick={() => {
            if (editingId) {
              updateEmployee();
            } else {
              addEmployee();
            }
          }}
        >
           {saving
            ? editingId
              ? "Updating..."
               : "Saving..."
               : editingId
               ? "Update Employee"
                : "Save Employee"}
            </button>
          
        {/* Cancel Button */}
        <button
          className="close-btn"
          style={{
            marginTop: "10px",
            background: "gray",
          }}
          onClick={() => {
            setShowAddModal(false);
            setFormError("");
          }}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default EmployeeFormModal;