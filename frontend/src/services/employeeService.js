const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const API_URL = `${API_BASE_URL}/employees`;

const ensureOk = async (response) => {
  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data.message || message;
    } catch (_) {}
    throw new Error(message);
  }
  return response;
};

export const getEmployees = async (page, limit, search, department) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    department,
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  await ensureOk(response);
  return response.json();
};

export const addEmployeeAPI = async (employee) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response;
};

export const updateEmployeeAPI = async (id, employee) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response;
};

export const deleteEmployeeAPI = async (id) => {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
