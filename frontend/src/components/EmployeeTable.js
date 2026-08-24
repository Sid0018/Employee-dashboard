function EmployeeTable({
  loading,
  sortedEmployees,
  page,
  limit,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  setSelectedEmployee,
}) {
  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>

            <th>S.No</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortField("name");

                setSortOrder(
                  sortField === "name" && sortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              Name{" "}

              {sortField === "name"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>

            <th>Department</th>

            <th>Role</th>

            <th>Status</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortField("salary");

                setSortOrder(
                  sortField === "salary" && sortOrder === "asc"
                    ? "desc"
                    : "asc"
                );
              }}
            >
              Salary{" "}

              {sortField === "salary"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>

          </tr>
        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td
                colSpan="6"
                className="loading-message"
              >
                Loading employees...
              </td>
            </tr>

          ) : sortedEmployees.length === 0 ? (

            <tr>
              <td colSpan="6" className="empty-message">
                <div className="empty-state">
                  <span className="empty-state-icon">🔎</span>
                  <strong>No employees found</strong>
                  <span>Try changing or resetting your filters.</span>
                </div>
              </td>
            </tr>

          ) : (

            sortedEmployees.map((employee, index) => (

              <tr
                key={employee.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setSelectedEmployee(employee)
                }
              >

                <td>
                  {(page - 1) * limit + index + 1}
                </td>

                <td>{employee.name}</td>

                <td>{employee.department}</td>

                <td>{employee.role}</td>

                <td>{employee.status}</td>

                <td>
                  ₹ {employee.salary}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;