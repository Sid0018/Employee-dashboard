# Employee Dashboard Review Notes

## Changes made
- Added a styled `No employees found` empty state to the employee table.
- Added frontend salary validation for non-numeric values.
- Fixed deletion of the final row on a paginated page so the UI moves back one page instead of leaving the user on an empty page.
- Moved the frontend API base URL to `REACT_APP_API_URL`, while retaining `http://localhost:5000` as the local-development fallback.
- Added `frontend/.env.example`.
- URL-encoded GET query parameters with `URLSearchParams`.
- Added GET response-status checking so server errors are handled as errors instead of being treated as employee data.
- Removed the unused duplicate `frontend/src/Login.js`; the application uses `frontend/src/components/Login.js`.

## Existing functionality reviewed in source
- Add, edit, and delete employee flows.
- Frontend and backend employee validation.
- Search and department filtering.
- Status-card filtering.
- Sorting and pagination.
- CSV export of the current displayed page.
- Dark-mode persistence through localStorage.
- Responsive CSS breakpoints for tablet/mobile layouts.
- Backend CRUD routes and unique employee ID generation.

## Important current limitations (left intentionally simple)
- Employee records are in memory and reset when the backend restarts.
- Login credentials/authentication are frontend-only and are not production security.
- Dashboard totals, status counts, status filtering, chart data, and CSV export operate on the employees loaded for the current page, not the entire server-side dataset.
- CORS currently allows all origins.

## Production preparation later
- Set `REACT_APP_API_URL` to the deployed backend URL when building the frontend.
- Add persistent database storage.
- Implement backend authentication/authorization.
- Restrict CORS to the deployed frontend origin.
- Consider a backend statistics/export endpoint for whole-dataset totals and exports.

## Test/build note
A production frontend build was attempted in the review environment, but the uploaded archive did not include installed dependencies (`node_modules`). Dependency installation could not complete within the available execution window, so a full React production build was not verified here. Run `npm install`/`npm ci` and `npm run build` in `frontend` on your development machine/server before deployment.
