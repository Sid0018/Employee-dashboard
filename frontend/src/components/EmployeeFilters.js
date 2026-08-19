function EmployeeFilters({
  search,
  setSearch,
  department,
  setDepartment,
  setPage,
  resetFilters,
  exportToCSV,
}) {
  return (
    <div className="top-bar">

      {/* Search */}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );

            setPage(1);
          }}
        />
      </div>

      {/* Department Filter */}

      <select
        value={department}
        onChange={(e) => {
          setDepartment(
            e.target.value
          );

          setPage(1);
        }}
      >
        <option value="">
          All Departments
        </option>

        <option value="IT">
          IT
        </option>

        <option value="HR">
          HR
        </option>

        <option value="Sales">
          Sales
        </option>

        <option value="Finance">
          Finance
        </option>

        <option value="Marketing">
          Marketing
        </option>
      </select>

      {/* Reset Filters */}

      <button
        className="reset-filter-btn"
        onClick={resetFilters}
      >
        Reset Filters
      </button>

      {/* Export CSV */}

      <button
        className="export-btn"
        onClick={exportToCSV}
      >
        ⬇ Export CSV
      </button>

    </div>
  );
}

export default EmployeeFilters;