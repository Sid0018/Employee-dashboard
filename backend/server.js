const express = require("express");
const cors = require("cors");

const app = express();

/* =========================================================
   MIDDLEWARE
   ========================================================= */

app.use(cors());
app.use(express.json());


/* =========================================================
   DUMMY EMPLOYEE DATA
   ========================================================= */

let employees = [
  {
    id: 1,
    name: "John Smith",
    department: "IT",
    role: "Developer",
    salary: 65000,
    status: "Active",
  },
  {
    id: 2,
    name: "Emma Watson",
    department: "HR",
    role: "Manager",
    salary: 72000,
    status: "Inactive",
  },
  {
    id: 3,
    name: "David Lee",
    department: "Sales",
    role: "Executive",
    salary: 55000,
    status: "Active",
  },
];


/* =========================================================
   EMPLOYEE OPTIONS
   ========================================================= */

const departments = [
  "IT",
  "HR",
  "Sales",
  "Finance",
  "Marketing",
];

const roles = [
  "Developer",
  "Manager",
  "Executive",
  "Analyst",
  "Tester",
];

const statusList = [
  "Active",
  "Inactive",
];

const names = [
  "Michael Brown",
  "Sophia Johnson",
  "William Davis",
  "Olivia Wilson",
  "James Miller",
  "Charlotte Moore",
  "Benjamin Taylor",
  "Amelia Anderson",
  "Lucas Thomas",
  "Mia Jackson",
  "Henry White",
  "Evelyn Harris",
  "Alexander Martin",
  "Harper Thompson",
  "Daniel Garcia",
  "Abigail Martinez",
  "Matthew Robinson",
  "Emily Clark",
  "Joseph Rodriguez",
  "Ella Lewis",
  "Samuel Walker",
  "Grace Hall",
  "David Allen",
  "Scarlett Young",
  "Andrew King",
  "Victoria Wright",
  "Christopher Scott",
  "Lily Green",
  "Joshua Adams",
  "Zoey Baker",
  "Ryan Nelson",
  "Hannah Carter",
  "Nathan Mitchell",
  "Avery Perez",
  "Jack Roberts",
  "Sofia Turner",
  "Logan Phillips",
  "Aria Campbell",
  "Gabriel Parker",
  "Chloe Evans",
  "Anthony Edwards",
  "Layla Collins",
  "Isaac Stewart",
  "Nora Sanchez",
  "Dylan Morris",
  "Leah Rogers",
  "Ethan Reed",
];


/* =========================================================
   GENERATE EMPLOYEES 4 - 50
   ========================================================= */

for (let i = 4; i <= 50; i++) {
  employees.push({
    id: i,
    name: names[i - 4],
    department:
      departments[i % departments.length],
    role:
      roles[i % roles.length],
    salary: 40000 + i * 1000,
    status:
      statusList[i % statusList.length],
  });
}


/* =========================================================
   EMPLOYEE VALIDATION
   ========================================================= */

const validateEmployee = (data) => {
  // Name validation
  if (
    !data.name ||
    data.name.trim() === ""
  ) {
    return "Employee name is required";
  }

  // Role validation
  if (
    !data.role ||
    data.role.trim() === ""
  ) {
    return "Role is required";
  }

  // Salary required
  if (
    data.salary === undefined ||
    data.salary === null ||
    data.salary === ""
  ) {
    return "Salary is required";
  }

  // Salary must be a valid number
  if (
    Number.isNaN(
      Number(data.salary)
    )
  ) {
    return "Salary must be a valid number";
  }

  // Salary must be greater than zero
  if (
    Number(data.salary) <= 0
  ) {
    return "Salary must be greater than 0";
  }

  // Department validation
  if (
    !departments.includes(
      data.department
    )
  ) {
    return "Invalid department";
  }

  // Status validation
  if (
    !statusList.includes(
      data.status
    )
  ) {
    return "Invalid status";
  }

  return null;
};


/* =========================================================
   HOME ROUTE
   ========================================================= */

app.get("/", (req, res) => {
  res.send(
    "Employee Dashboard API Running"
  );
});


/* =========================================================
   GET EMPLOYEES
   ========================================================= */

app.get("/employees", (req, res) => {
  let page =
    Number(req.query.page) || 1;

  let limit =
    Number(req.query.limit) || 10;

  const search =
    req.query.search || "";

  const department =
    req.query.department || "";

  // Prevent invalid pagination values
  if (
    !Number.isInteger(page) ||
    page < 1
  ) {
    page = 1;
  }

  if (
    !Number.isInteger(limit) ||
    limit < 1
  ) {
    limit = 10;
  }

  let filteredEmployees = [
    ...employees,
  ];


  /* -------------------------
     Search by Employee Name
     ------------------------- */

  if (search) {
    filteredEmployees =
      filteredEmployees.filter(
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
  }


  /* -------------------------
     Filter by Department
     ------------------------- */

  if (department) {
    filteredEmployees =
      filteredEmployees.filter(
        (employee) =>
          employee.department ===
          department
      );
  }


  /* -------------------------
     Pagination
     ------------------------- */

  const startIndex =
    (page - 1) * limit;

  const endIndex =
    startIndex + limit;

  const paginatedEmployees =
    filteredEmployees.slice(
      startIndex,
      endIndex
    );


  /* -------------------------
     Response
     ------------------------- */

  res.json({
    currentPage: page,

    totalPages: Math.ceil(
      filteredEmployees.length /
        limit
    ),

    totalEmployees:
      filteredEmployees.length,

    employees:
      paginatedEmployees,
  });
});


/* =========================================================
   POST - ADD EMPLOYEE
   ========================================================= */

app.post(
  "/employees",
  (req, res) => {
    /* -------------------------
       Validate Employee
       ------------------------- */

    const validationError =
      validateEmployee(req.body);

    if (validationError) {
      return res
        .status(400)
        .json({
          message:
            validationError,
        });
    }


    /* -------------------------
       Generate Unique ID
       ------------------------- */

    const newId =
      employees.length > 0
        ? Math.max(
            ...employees.map(
              (employee) =>
                employee.id
            )
          ) + 1
        : 1;


    /* -------------------------
       Create Employee
       ------------------------- */

    const newEmployee = {
      id: newId,

      name:
        req.body.name.trim(),

      department:
        req.body.department,

      role:
        req.body.role.trim(),

      salary:
        Number(req.body.salary),

      status:
        req.body.status,
    };


    employees.push(
      newEmployee
    );


    /* -------------------------
       Response
       ------------------------- */

    res.status(201).json({
      message:
        "Employee added successfully",

      employee:
        newEmployee,
    });
  }
);


/* =========================================================
   PUT - UPDATE EMPLOYEE
   ========================================================= */

app.put(
  "/employees/:id",
  (req, res) => {
    const id =
      Number(req.params.id);


    /* -------------------------
       Validate Employee ID
       ------------------------- */

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid employee ID",
        });
    }


    /* -------------------------
       Find Employee
       ------------------------- */

    const employee =
      employees.find(
        (emp) =>
          emp.id === id
      );


    if (!employee) {
      return res
        .status(404)
        .json({
          message:
            "Employee not found",
        });
    }


    /* -------------------------
       Validate Updated Data
       ------------------------- */

    const validationError =
      validateEmployee(req.body);

    if (validationError) {
      return res
        .status(400)
        .json({
          message:
            validationError,
        });
    }


    /* -------------------------
       Update Employee
       ------------------------- */

    employee.name =
      req.body.name.trim();

    employee.department =
      req.body.department;

    employee.role =
      req.body.role.trim();

    employee.salary =
      Number(req.body.salary);

    employee.status =
      req.body.status;


    /* -------------------------
       Response
       ------------------------- */

    res.json({
      message:
        "Employee updated successfully",

      employee,
    });
  }
);


/* =========================================================
   DELETE EMPLOYEE
   ========================================================= */

app.delete(
  "/employees/:id",
  (req, res) => {
    const id =
      Number(req.params.id);


    /* -------------------------
       Validate Employee ID
       ------------------------- */

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid employee ID",
        });
    }


    /* -------------------------
       Find Employee
       ------------------------- */

    const employee =
      employees.find(
        (emp) =>
          emp.id === id
      );


    if (!employee) {
      return res
        .status(404)
        .json({
          message:
            "Employee not found",
        });
    }


    /* -------------------------
       Delete Employee
       ------------------------- */

    employees =
      employees.filter(
        (emp) =>
          emp.id !== id
      );


    /* -------------------------
       Response
       ------------------------- */

    res.json({
      message:
        "Employee deleted successfully",
    });
  }
);


/* =========================================================
   START SERVER
   ========================================================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});