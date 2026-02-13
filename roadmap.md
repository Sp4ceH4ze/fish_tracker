# Fish Session Tracker – Development Roadmap

Based on design_doc.md

---

# Phase 0 — Project Setup (Foundation)

## Goals
Establish structure, tooling, and database baseline.

## Tasks

### Repository & Tooling
- Initialize Git repository
- Setup Node.js project (`npm init`)
- Install dependencies:
  - `express`
  - `prisma`
  - `@prisma/client`
  - `zod`
  - `dotenv`
- Setup folder structure from design document

### Environment Setup
- Create `.env`
- Configure SQLite database
- Setup Prisma

## Deliverable
- App runs with empty Express server
- Prisma connected to SQLite
- Folder structure in place

---

# Phase 1 — Database & Schema Design

## Goals
Implement entities exactly as defined in design document.

## Tasks

### 1. Prisma Schema

Implement:
- User
- FishingSession
- Catch
- Species

Add:
- Foreign key constraints
- Indexes:
  - `FishingSession.date`
  - `FishingSession.location_name`
  - `Catch.species_id`
- Soft delete flag on FishingSession (`is_deleted` boolean)

### 2. Seed Data
- Create predefined species list
- Add seed script

### 3. Migrations
- Run first migration
- Validate schema with test inserts

## Deliverable
- Fully functional relational schema
- Seeded species list

---

# Phase 2 — Core REST API (Backend MVP)

## Goals
Implement CRUD for sessions and catches.

## Endpoints

### Sessions
- `GET /sessions`
- `POST /sessions`
- `GET /sessions/:id`
- `PUT /sessions/:id`
- `DELETE /sessions/:id` (soft delete)

### Catches
- `POST /sessions/:id/catches`
- `PUT /catches/:id`
- `DELETE /catches/:id`

### Species
- `GET /species`
- `GET /species/active`

## Validation Rules
- Length > 0
- Weight > 0
- Species must exist
- Date must be valid

## Service Layer
Implement:
- SessionService
- CatchService
- DashboardService (stub only)

Keep routes thin.

## Testing
- Test all endpoints with Postman
- Validate error handling
- Test soft delete behavior

## Deliverable
- Fully working backend API
- All core operations functional

---

# Phase 3 — Basic Frontend (MVP UI)

## Goals
Minimal UI to manage sessions and catches.

## Pages
- Sessions List Page
- Create/Edit Session Page
- Session Detail Page
- Add Catch Modal/Form
- Simple Dashboard Page

## UI Principles
- Clean layout
- Minimal dependencies
- Fast catch entry workflow
- Quick Add Catch button

## Features Implemented
- Create session
- Edit session
- Add multiple catches
- Delete catches
- Display list of catches per session

## Deliverable
- End-to-end functional application

---

# Phase 4 — Dashboard (Backend-Driven)

## Goals
Implement MVP dashboard calculations.

## Metrics to Implement
- Total sessions
- Total fish caught
- Unique species count
- Fish per location
- Average fish per session

## Implementation Strategy
- Create `DashboardService`
- Perform aggregation queries in database
- Return precomputed values via:
  - `GET /dashboard/summary`

Add basic filtering:
- Date range

## Deliverable
- Functional dashboard with summary cards
- Filter by date working

---

# Phase 5 — Data Integrity & Hardening

## Goals
Strengthen correctness and maintainability.

## Tasks
- Enforce foreign key constraints
- Prevent deleting species in use
- Add proper HTTP status codes
- Centralized error handler
- Logging middleware
- Add indexes if missing

## Edge Case Testing
- Delete session with catches
- Invalid species ID
- Negative values
- Missing required fields

## Deliverable
- Stable, robust backend

---

# Phase 6 — Quality Improvements

## Refactoring
- Extract config module
- Improve service layer separation
- Add reusable validation schemas
- Clean code structure

## Optional Enhancements
- Most productive location
- Most effective bait
- Most productive time of day
- Personal best per species

## Deliverable
- Clean architecture
- Expanded analytics

---

# Phase 7 — Export & Backup

## Features
- `GET /export/csv`
- `GET /export/json`
- Import endpoint for JSON

## Purpose
- Data portability
- Backup safety
- Professional usability

## Deliverable
- Data export/import working

---

# Phase 8 — Geolocation & Performance Enhancements (Optional)

## Enhancements
- Create Locations table
- Add lat/lng
- Integrate Leaflet.js
- Weather data storage

---

# Phase 9 — Long-Term Scalability Path

Only after solid MVP:
- Add authentication
- Convert to TypeScript
- Switch SQLite → PostgreSQL
- Migrate frontend to React if needed
- Add PWA capability

---

# Suggested Timeline (Junior Developer Pace)

| Phase | Duration |
|-------|----------|
| Phase 0–1 | 3–4 days |
| Phase 2 | 5–7 days |
| Phase 3 | 5–7 days |
| Phase 4 | 3–5 days |
| Phase 5 | 3–4 days |
| Phase 6+ | Iterative |

Total realistic MVP: **3–4 weeks part-time**

---

# Recommended Execution Order Summary

1. Database first  
2. Backend API  
3. Basic frontend  
4. Dashboard  
5. Hardening  
6. Enhancements  