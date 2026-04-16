# Portfolio App — Sudhir Tiwari

A modern, dark-themed personal portfolio website built with **Angular 15**, **Tailwind CSS**, and **Angular Material**. It showcases professional experience, projects, tech stack, and includes interactive features like a guestbook, testimonials/appreciation system, and meeting scheduler.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend API](#backend-api)
- [Routes](#routes)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Features

- **Hero / Landing Page** — Headline, intro, "Let's Connect" CTA, email copy-to-clipboard, and technology stack icons.
- **About** — Bio, interests, and an auto-rotating image carousel (profile, workout, travel photos) with social links.
- **Experience Timeline** — Animated vertical timeline with scroll-triggered progress bar showing work history (Clarivate, Infosys).
- **Work / Projects Carousel** — Swipeable showcase of professional projects with detailed views, challenges, and outcomes.
- **Content Showcase** — Collaboration card, animated timezone globe, and floating SaaS feature cards.
- **Explore Section** — Navigation cards linking to Uses, Guestbook, Appreciation, Links, and Attribution pages.
- **Contact Dialog** — Quick-connect modal with social icons, email, and booking CTA.
- **Meeting Scheduler** — FullCalendar-powered date picker with 30-minute time slots and email integration.
- **Testimonials / Appreciation** — Submit and view colleague appreciations with Clearbit company autocomplete. Multi-source storage (API → JSON file → localStorage).
- **Guestbook** — GitHub-powered comment system via Giscus.
- **Responsive Design** — Mobile hamburger menu, swipe support, tablet and desktop layouts.
- **Resume Download** — Direct PDF download from the navbar.
- **Loader** — Route-change loading overlay.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Angular 15 | Application framework |
| TypeScript 4.9 | Type-safe development |
| Tailwind CSS 3 | Utility-first styling |
| Angular Material 15 | UI components (dialogs, snackbars, tabs, cards, icons) |
| RxJS 7 | Reactive state management |
| FullCalendar 6 | Meeting date/time picker |
| Firebase | Additional integrations |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 4 | REST API server |
| Mongoose 7 | MongoDB ODM |
| MongoDB Atlas | Cloud database (optional — falls back to JSON file) |
| dotenv | Environment variable management |

### Tooling & Services

| Tool | Purpose |
|---|---|
| Giscus | GitHub-powered comment widget |
| Clearbit API | Company name autocomplete |
| Calendly | External scheduling widget |
| Font Awesome 6 | Icon library |
| Karma + Jasmine | Unit testing |

---

## Project Structure

```
portfolio-app/
├── src/                          # Angular frontend source
│   ├── app/
│   │   ├── home/                 # Landing page with hero, tech icons, testimonials
│   │   ├── about/                # About me with image carousel
│   │   ├── experience/           # Work timeline with scroll animations
│   │   ├── work/                 # Projects carousel
│   │   ├── content-showcase/     # Collaboration & timezone showcase cards
│   │   ├── explore-section/      # Navigation cards to utility pages
│   │   ├── navbar/               # Top navigation bar with mobile menu
│   │   ├── loader/               # Loading spinner overlay
│   │   ├── contact-dialog/       # Quick-connect modal dialog
│   │   ├── section-ending/       # Footer CTA section
│   │   ├── more/                 # Meeting scheduler (FullCalendar)
│   │   ├── more-utilities/       # Lazy-loaded utility module
│   │   │   ├── guestbook/        #   GitHub comments (Giscus)
│   │   │   ├── bucket-list/      #   Appreciation / testimonials form
│   │   │   ├── links/            #   Social links page
│   │   │   ├── uses/             #   Tools & software page
│   │   │   ├── attribution/      #   Site credits
│   │   │   └── more-utilities-dropdown/  # Navbar dropdown menu
│   │   └── services/             # ContactService, ContactDialogService, TestimonialService
│   ├── assets/
│   │   ├── data/                 # testimonials.json
│   │   ├── documents/            # Sudhir_Tiwari_Resume.pdf
│   │   ├── images/               # Photos, logos, screenshots
│   │   └── svg-icons/            # Tech stack & social SVG icons
│   ├── environments/             # Environment configuration
│   ├── styles.css                # Global styles (Tailwind + Material overrides)
│   └── index.html                # Root HTML with font & icon CDN links
├── backend/                      # Express.js testimonials API
│   ├── server.js                 # Main server with REST endpoints
│   ├── models/Testimonial.js     # Mongoose schema
│   ├── data/testimonials.json    # File-based testimonial storage
│   ├── scripts/importTestimonials.js  # DB import utility
│   └── test-connection.js        # MongoDB connection tester
├── angular.json                  # Angular CLI workspace config
├── tailwind.config.js            # Tailwind CSS configuration
├── package.json                  # Frontend dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** 8+
- Angular CLI: `npm install -g @angular/cli@15`

### Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### Run the Application

```bash
# Start the Angular dev server (http://localhost:4200)
npm start

# In a separate terminal, start the backend API (http://localhost:3001)
cd backend
npm start
```

The frontend will automatically proxy testimonial requests to `localhost:3001`. If the backend is not running, the app gracefully falls back to the local JSON file and then localStorage.

### Build for Production

```bash
ng build --configuration production
```

Build output is written to `dist/portfolio-app/`.

### Run Unit Tests

```bash
ng test
```

Runs Karma with Jasmine in a Chrome browser.

---

## Backend API

The backend is an Express.js server that provides testimonial CRUD operations. See [backend/README.md](backend/README.md) for full details.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/testimonials` | Fetch all testimonials |
| `POST` | `/api/testimonials` | Submit a new testimonial |
| `GET` | `/api/testimonials/:id` | Get a specific testimonial |
| `GET` | `/health` | Health check |
| `GET` | `/` | API info & available endpoints |

---

## Routes

| Route | Component | Description |
|---|---|---|
| `/home` | HomeComponent | Landing page (default) |
| `/about` | AboutComponent | About me with image carousel |
| `/work` | WorkComponent | Projects portfolio |
| `/more` | MoreComponent | Meeting scheduler |
| `/guestbook` | GuestbookComponent | GitHub-powered comments |
| `/appreciation` | BucketListComponent | Testimonial submission & display |
| `/links` | LinksComponent | Social links directory |
| `/uses` | UsesComponent | Tools & software |
| `/attribution` | AttributionComponent | Site credits & acknowledgments |

The `more-utilities` module is **lazy-loaded** to reduce the initial bundle size.

---

## Environment Variables

### Frontend (`src/environments/environment.ts`)

| Variable | Description |
|---|---|
| `googleClientId` | Google OAuth client ID (for calendar integration) |
| `googleApiKey` | Google API key |

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env` and set:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: `3001`) |

> **Note:** MongoDB is optional. The backend falls back to file-based storage (`backend/data/testimonials.json`) when no database is configured.

---

## Scripts

### Frontend (`package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `ng serve` | Start development server |
| `build` | `ng build` | Production build |
| `test` | `ng test` | Run unit tests |
| `watch` | `ng build --watch --configuration development` | Watch mode build |

### Backend (`backend/package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `node server.js` | Start the API server |
| `dev` | `nodemon server.js` | Start with auto-reload |

---

## Deployment

1. Build the frontend: `ng build --configuration production`
2. Serve `dist/portfolio-app/` from any static hosting (Netlify, Vercel, Firebase Hosting, etc.)
3. Deploy the backend to a Node.js host (Railway, Render, Heroku, etc.) with `MONGODB_URI` set
4. Update `TestimonialService.API_BASE` to point to the deployed backend URL
