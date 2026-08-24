function DashboardHeader({
  setIsLoggedIn,
  darkMode,
  setDarkMode,
  exportToCSV,
}) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
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
          className="export-btn"
          onClick={exportToCSV}
        >
          ⬇ Export CSV
        </button>

      </div>
    </div>
  );
}

export default DashboardHeader;