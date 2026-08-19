import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   COMPONENTS
   ========================================================= */

import Login from "./components/Login";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCards";
import DashboardCharts from "./components/DashboardCharts";
import EmployeeFilters from "./components/EmployeeFilters";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";
import EmployeeFormModal from "./components/EmployeeFormModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import SuccessToast from "./components/SuccessToast";
import ErrorToast from "./components/ErrorToast";

/* =========================================================
   SERVICES
   ========================================================= */

import {
  getEmployees,
  addEmployeeAPI,
  updateEmployeeAPI,
  deleteEmployeeAPI,
} from "./services/employeeService";

/* =========================================================
   DEFAULT EMPLOYEE
   ========================================================= */

const emptyEmployee = {
  name: "",
  department: "IT",
  role: "",
  salary: "",
  status: "Active",
};

function App() {
  /* =========================================================
     EMPLOYEE STATE
     ========================================================= */

  const [employees, setEmployees] = useState([]);

  const [newEmployee, setNewEmployee] = useState(emptyEmployee);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  /* =========================================================
     SEARCH / FILTER / SORT
     ========================================================= */

  const [search, setSearch] = useState("");

  const [department, setDepartment] =useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [sortField, setSortField] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  /* =========================================================
     PAGINATION
     ========================================================= */

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  /* =========================================================
     MODAL / FORM
     ========================================================= */

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formError, setFormError] = useState("");

  const [saving, setSaving] = useState(false);

  /* =========================================================
     LOGIN
     ========================================================= */

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn") === "true"
    );

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");

  /* =========================================================
     TOAST MESSAGES
     ========================================================= */

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  /* =========================================================
     LOADING
     ========================================================= */

  const [loading, setLoading] = useState(false);

  /* =========================================================
     DARK MODE
     ========================================================= */

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("darkMode") === "true"
    );

  /* =========================================================
     MESSAGE HELPERS
     ========================================================= */

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  /* =========================================================
     LOAD EMPLOYEES
     ========================================================= */

  const loadEmployees = async () => {
    setLoading(true);

    try {
      const data = await getEmployees(
        page,
        limit,
        search,
        department
      );

      setEmployees(data.employees || []);

      setTotalPages(
        data.totalPages || 1
      );
    } catch (error) {
      console.log(error);

      showErrorMessage(
        "Unable to load employees. Please check the server connection."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     EFFECTS
     ========================================================= */

  useEffect(() => {
    if (isLoggedIn) {
      loadEmployees();
    }
  }, [
    page,
    limit,
    search,
    department,
    isLoggedIn,
  ]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  /* =========================================================
     LOGIN
     ========================================================= */

  const handleLogin = () => {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      setIsLoggedIn(true);

      setLoginError("");
    } else {
      setLoginError(
        "Invalid username or password"
      );
    }
  };

  /* =========================================================
     RESET FILTERS
     ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setDepartment("");
    setStatusFilter("");
    setSortField("");
    setSortOrder("asc");
    setPage(1);
  };

  /* =========================================================
     EMPLOYEE VALIDATION
     ========================================================= */

  const validateEmployee = () => {
    if (newEmployee.name.trim() === "") {
      setFormError(
        "Employee name is required"
      );

      return false;
    }

    if (newEmployee.role.trim() === "") {
      setFormError(
        "Role is required"
      );

      return false;
    }

    if (newEmployee.salary === "") {
      setFormError(
        "Salary is required"
      );

      return false;
    }

    if (
      Number(newEmployee.salary) <= 0
    ) {
      setFormError(
        "Salary must be greater than 0"
      );

      return false;
    }

    setFormError("");

    return true;
  };

  /* =========================================================
     ADD EMPLOYEE
     ========================================================= */

  const addEmployee = async () => {
    if (!validateEmployee()) {
      return;
    }

    setSaving(true);

    try {
      const response = await addEmployeeAPI(newEmployee);

      if (!response.ok) {
        showErrorMessage("Unable to add employee");
       return;
      }

      loadEmployees();

      showSuccessMessage ("Employee added successfully!");

      setShowAddModal(false);

      setNewEmployee(emptyEmployee);
    } catch (error) {
      console.log(error);

      showErrorMessage("Unable to connect to the server");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     UPDATE EMPLOYEE
     ========================================================= */

  const updateEmployee = async () => {
    if (!validateEmployee()) {
      return;
    }

    setSaving(true);

    try {
      const response =
        await updateEmployeeAPI(
          editingId,
          newEmployee
        );

      if (!response.ok) {
        showErrorMessage(
          "Unable to update employee"
        );

        return;
      }

      loadEmployees();

      showSuccessMessage(
        "Employee updated successfully!"
      );

      setShowAddModal(false);

      setEditingId(null);

      setNewEmployee(
        emptyEmployee
      );
    } catch (error) {
      console.log(error);

      showErrorMessage(
        "Unable to connect to the server"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     DELETE EMPLOYEE
     ========================================================= */

  const deleteEmployee = async (id) => {
    try {
      const response =
        await deleteEmployeeAPI(id);

      if (!response.ok) {
        showErrorMessage(
          "Unable to delete employee"
        );

        return;
      }

      loadEmployees();

      showSuccessMessage(
        "Employee deleted successfully!"
      );
    } catch (error) {
      console.log(error);

      showErrorMessage(
        "Unable to connect to the server"
      );
    }
  };

  /* =========================================================
     LOGIN SCREEN
     ========================================================= */

  if (!isLoggedIn) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
      />
    );
  }

  /* =========================================================
     STATUS FILTER
     ========================================================= */

  let filteredEmployees = [
    ...employees,
  ];

  if (statusFilter !== "") {
    filteredEmployees =
      filteredEmployees.filter(
        (employee) =>
          employee.status ===
          statusFilter
      );
  }

  /* =========================================================
     SORT EMPLOYEES
     ========================================================= */

  const sortedEmployees = [
    ...filteredEmployees,
  ].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    if (
      a[sortField] <
      b[sortField]
    ) {
      return sortOrder === "asc"
        ? -1
        : 1;
    }

    if (
      a[sortField] >
      b[sortField]
    ) {
      return sortOrder === "asc"
        ? 1
        : -1;
    }

    return 0;
  });

  /* =========================================================
     EXPORT CURRENT TABLE TO CSV
     ========================================================= */

  const exportToCSV = () => {
    if (sortedEmployees.length === 0) {
      showErrorMessage(
        "No employees available to export"
      );

      return;
    }

    const headers = [
      "S.No",
      "Name",
      "Department",
      "Role",
      "Status",
      "Salary",
    ];

    const rows =
      sortedEmployees.map(
        (employee, index) => [
          (page - 1) * limit +
            index +
            1,

          employee.name,

          employee.department,

          employee.role,

          employee.status,

          employee.salary,
        ]
      );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const safeValue =
              String(
                value ?? ""
              ).replace(
                /"/g,
                '""'
              );

            return `"${safeValue}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "employees.csv";

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(url);

    showSuccessMessage(
      "Employee CSV exported successfully!"
    );
  };

  /* =========================================================
     DASHBOARD STATISTICS
     ========================================================= */

  const totalEmployees =
    employees.length;

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status === "Active"
    ).length;

  const inactiveEmployees =
    employees.filter(
      (employee) =>
        employee.status === "Inactive"
    ).length;

  /* =========================================================
     MAIN DASHBOARD
     ========================================================= */

  return (
    <div
      className={
        darkMode
          ? "app dark-mode"
          : "app"
      }
    >
      <div className="container">

        {/* Toast Messages */}

        <SuccessToast
          successMessage={ successMessage}
        />

        <ErrorToast
          errorMessage={errorMessage}
        />

        {/* Header */}

        <DashboardHeader
          setIsLoggedIn={setIsLoggedIn}
          setEditingId={setEditingId}
          setNewEmployee={setNewEmployee}
          setShowAddModal={setShowAddModal}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Dashboard Cards */}

        <DashboardCards
          totalEmployees={totalEmployees}
          activeEmployees={activeEmployees}
          inactiveEmployees={inactiveEmployees}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Department Chart */}

        <DashboardCharts
          employees={employees}
        />

        {/* Search / Filters / Export */}

        <EmployeeFilters
          search={search}
          setSearch={setSearch}
          department={department }
          setDepartment={setDepartment}
          setPage={setPage}
          resetFilters={resetFilters}
          exportToCSV={exportToCSV }
        />

        {/* Employee Table */}

        <EmployeeTable
          loading={loading}
          sortedEmployees={sortedEmployees }
          page={page}
          limit={limit}
          sortField={sortField }
          sortOrder={sortOrder }
          setSortField={setSortField}
          setSortOrder={ setSortOrder}
          setSelectedEmployee={setSelectedEmployee }
        />

        {/* Pagination */}

        <Pagination
          page={page}
          totalPages={totalPages}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />

        {/* Employee Details */}

        <EmployeeDetailsModal
          selectedEmployee={selectedEmployee }
          setSelectedEmployee={ setSelectedEmployee }
          setNewEmployee={setNewEmployee}
          setEditingId={setEditingId }
          setShowAddModal={setShowAddModal}
          setEmployeeToDelete={setEmployeeToDelete}
        />

        {/* Delete Confirmation */}

        <DeleteConfirmationModal
          employeeToDelete={employeeToDelete}
          setEmployeeToDelete={setEmployeeToDelete}
          deleteEmployee={deleteEmployee}
        />

        {/* Add / Edit Employee */}

        <EmployeeFormModal
          showAddModal={showAddModal}
          editingId={editingId}
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          addEmployee={addEmployee}
          updateEmployee={ updateEmployee}
          setShowAddModal={setShowAddModal}
          formError={formError}
          setFormError={setFormError}
          saving={saving}
        />

      </div>
    </div>
  );
}

export default App;