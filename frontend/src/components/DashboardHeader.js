function DashboardHeader({
  setIsLoggedIn,
  setEditingId,
  setNewEmployee,
  setShowAddModal,
  darkMode,
  setDarkMode,
}) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleAddEmployee = () => {
    setEditingId(null);

    setNewEmployee({
      name: "",
      department: "IT",
      role: "",
      salary: "",
      status: "Active",
    });

    setShowAddModal(true);
  };

  return (
    <div className="header">
      <h1>Employee Dashboard</h1>

      <div className="header-buttons">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          className="add-btn"
          onClick={handleAddEmployee}
        >
          + Add Employee
        </button>

      </div>
    </div>
  );
}

export default DashboardHeader;