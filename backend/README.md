# Portfolio App — Backend API

A lightweight Express.js REST API that serves as the testimonials/appreciation backend for the portfolio application. Supports **MongoDB Atlas** as the primary data store with an automatic **JSON file fallback** for local development without a database.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Data Storage](#data-storage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Utilities](#utilities)

---

## Features

- **REST API** for testimonials (GET, POST, GET by ID)
- **MongoDB Atlas** integration with Mongoose ODM
- **JSON file fallback** — works without a database for easy local development
- **Input validation** — all fields required on POST
- **CORS enabled** — accepts requests from the Angular frontend
- **Health check endpoint** for monitoring
- **Data import script** — bulk import testimonials from JSON to MongoDB

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 16+ | Runtime |
| Express | ^4.18 | HTTP framework |
| Mongoose | ^7.5 | MongoDB ODM |
| cors | ^2.8 | Cross-origin requests |
| body-parser | ^1.20 | Request body parsing |
| dotenv | ^16.1 | Environment variables |
| nodemon | ^2.0 | Dev auto-reload |

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** 8+
- (Optional) A MongoDB Atlas cluster — not required for local development

### Installation

```bash
cd backend
npm install
```

### Configuration

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and set your MongoDB connection string (optional)
```

If `MONGODB_URI` is not set, the server uses `data/testimonials.json` as the data store.

### Start the Server

```bash
# Production
npm start

# Development (auto-reload with nodemon)
npm run dev
```

The API runs on **http://localhost:3001** by default.

---

## API Endpoints

### `GET /`

Returns API info and available endpoints.

**Response:**
```json
{
  "message": "Portfolio Testimonials API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/testimonials": "Get all testimonials",
    "POST /api/testimonials": "Add new testimonial",
    "GET /api/testimonials/:id": "Get specific testimonial",
    "GET /health": "Health check"
  }
}
```

### `GET /api/testimonials`

Returns all testimonials sorted by newest first.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "userName": "Jane Doe",
      "position": "Senior Engineer",
      "company": "Acme Corp",
      "message": "Great collaborator and skilled developer.",
      "timestamp": "2025-01-15T10:30:00.000Z",
      "approved": true
    }
  ],
  "count": 1
}
```

### `POST /api/testimonials`

Submits a new testimonial.

**Request body:**
```json
{
  "userName": "Jane Doe",
  "position": "Senior Engineer",
  "company": "Acme Corp",
  "message": "Great collaborator and skilled developer."
}
```

All four fields are **required**. Returns `400` if any field is missing.

**Success response** (`201`):
```json
{
  "success": true,
  "message": "Testimonial added successfully",
  "data": { ... }
}
```

### `GET /api/testimonials/:id`

Returns a single testimonial by ID.

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Portfolio Testimonials API is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## Data Storage

The backend uses a **two-tier storage strategy**:

1. **MongoDB Atlas** (primary) — Used when `MONGODB_URI` is set in `.env`. Data is stored in a `testimonials` collection with Mongoose schema validation.
2. **JSON file** (fallback) — Used when MongoDB is unavailable or not configured. Data is read from and written to `data/testimonials.json`.

The frontend `TestimonialService` adds a third tier: **localStorage** in the browser, used when neither the API nor the JSON file is reachable.

---

## Project Structure

```
backend/
├── server.js                 # Express app with all routes and middleware
├── models/
│   └── Testimonial.js        # Mongoose schema (userName, position, company, message, etc.)
├── data/
│   └── testimonials.json     # File-based testimonial storage (fallback)
├── scripts/
│   └── importTestimonials.js # Bulk import from JSON to MongoDB
├── test-connection.js        # MongoDB connection test utility
├── .env.example              # Environment variable template
├── .env                      # Local env vars (git-ignored)
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## Environment Variables

Set these in `backend/.env` (copy from `.env.example`):

| Variable | Required | Default | Description |
|---|---|---|---|
| `MONGODB_URI` | No | — | MongoDB Atlas connection string. If omitted, file-based storage is used. |
| `PORT` | No | `3001` | Port the server listens on. |

> **Important:** Never commit `.env` to version control. The `.gitignore` is configured to exclude it.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `node server.js` | Start the server |
| `dev` | `nodemon server.js` | Start with auto-reload for development |

---

## Utilities

### Test MongoDB Connection

```bash
node test-connection.js
```

Verifies that your `MONGODB_URI` can successfully connect to MongoDB Atlas.

### Import Testimonials to MongoDB

```bash
node scripts/importTestimonials.js
```

Reads `data/testimonials.json` and bulk-inserts all entries into the MongoDB `testimonials` collection. Requires `MONGODB_URI` to be set.
