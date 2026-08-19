# Employee Dashboard

A full-stack employee management dashboard built with React, Material UI,
Recharts, Node.js, and Express.

## Features

- Demo login screen
- Employee search, filtering, sorting, and pagination
- Dashboard summary cards and charts
- View, add, edit, and delete employee records
- Responsive layout and dark mode

## Project structure

```text
employee-dashboard/
├── backend/    # Express REST API
└── frontend/   # React dashboard
```

## Run locally

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

### 2. Start the backend

```bash
npm run backend
```

The API runs at `http://localhost:5000`.

### 3. Start the frontend

In a second terminal:

```bash
npm run frontend
```

The dashboard opens at `http://localhost:3000`.

## Demo login

- Username: `admin`
- Password: `admin123`

This login is implemented only in the frontend for demonstration. It is not
secure authentication and must not be used in production.

## Configuration

The frontend uses `http://localhost:5000` by default. For another API host,
create `frontend/.env`:

```env
REACT_APP_API_URL=https://your-api.example.com
```

The backend port can be changed with the `PORT` environment variable.

## API endpoints

- `GET /employees` — list employees with search, department filtering, and pagination
- `POST /employees` — add an employee
- `PUT /employees/:id` — update an employee
- `DELETE /employees/:id` — delete an employee

Employee data is stored in memory and resets whenever the backend restarts.
