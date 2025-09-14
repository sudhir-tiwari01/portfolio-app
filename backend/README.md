Backend for portfolio-app testimonials

Quick start:

1. cd backend
2. npm install
3. npm start

API endpoints:
- GET /api/testimonials -> returns { success, data, count }
- POST /api/testimonials -> accepts { userName, position, company, message }

Notes:
- Data is stored in `backend/data/testimonials.json` for simplicity.
- This is intentionally minimal for local development. For production, use a proper database and validation.
