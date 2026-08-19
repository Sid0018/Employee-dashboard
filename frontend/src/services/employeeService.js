const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/employees`;

// Get employees
export const getEmployees = async (
  page,
  limit,
  search,
  department
) => {
  const response = await fetch(
    `${API_URL}?page=${page}&limit=${limit}&search=${search}&department=${department}`
  );

  return response.json();
};

// Add employee
export const addEmployeeAPI = async (employee) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  return response;
};

// Update employee
export const updateEmployeeAPI = async (id, employee) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  return response;
};

// Delete employee
export const deleteEmployeeAPI = async (id) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  return response;
};
