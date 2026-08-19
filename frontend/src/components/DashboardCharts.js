import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function DashboardCharts({ employees }) {
  const departmentData = [
    {
      name: "IT",
      count: employees.filter(
        (employee) => employee.department === "IT"
      ).length,
    },
    {
      name: "HR",
      count: employees.filter(
        (employee) => employee.department === "HR"
      ).length,
    },
    {
      name: "Sales",
      count: employees.filter(
        (employee) => employee.department === "Sales"
      ).length,
    },
    {
      name: "Finance",
      count: employees.filter(
        (employee) => employee.department === "Finance"
      ).length,
    },
    {
      name: "Marketing",
      count: employees.filter(
        (employee) => employee.department === "Marketing"
      ).length,
    },
  ];

  return (
    <div className="charts-container">

      <div className="chart-card department-chart-card">
        <h3>Employees by Department</h3>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

             
                  <Tooltip cursor={false} />
           

              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default DashboardCharts;