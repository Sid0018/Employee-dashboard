function DeleteConfirmationModal({
  employeeToDelete,
  setEmployeeToDelete,
  deleteEmployee,
}) {
  // Do not display anything when no employee is selected
  if (!employeeToDelete) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="delete-confirm-modal">

        <h2>⚠ Delete Employee?</h2>

        <p>
          Are you sure you want to delete
          <strong> {employeeToDelete.name}</strong>?
        </p>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="delete-confirm-buttons">

          <button
            className="cancel-delete-btn"
            onClick={() => setEmployeeToDelete(null)}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-btn"
            onClick={() => {
              deleteEmployee(employeeToDelete.id);
              setEmployeeToDelete(null);
            }}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmationModal;