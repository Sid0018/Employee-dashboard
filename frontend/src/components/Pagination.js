function Pagination({
  page,
  totalPages,
  limit,
  setPage,
  setLimit,
}) {
  return (
    <div className="pagination">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>

      <div style={{ marginLeft: "20px" }}>
        Show:

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          style={{
            marginLeft: "8px",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

    </div>
  );
}

export default Pagination;