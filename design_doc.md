# Fish Session Tracker App (Design Document)

## 1. Entities and Relationships

### User
- id
- name

### FishingSession
- id
- date
- location_name
- notes (optional)

### Catch
- id
- session_id
- species_id
- length_cm (optional)
- weight_kg (optional)
- bait_used (optional)
- time_caught (optional)

### Species
- id
- name
- is_active (for hiding species later)

## 2. Refine Functional Requirements

### Session Management

- Create session
- Edit session metadata (date, location, notes)
- Delete session (soft delete recommended)
- View session details
- Add multiple catches per session
- Edit/remove catches independently

### Catch Entry Improvements

- Quick-add workflow (add multiple catches fast)

Validation Rules:
- Length must be positive
- Weight must be positive
- Species must exist

### Dashboard (Optional at first)

Split dashboard into:

#### Summary Cards

- Total sessions
- Total fish caught
- Unique species count
- Average fish per session
- Biggest fish (by weight or length)
- Most productive location
- Most productive time of day
- Most effective bait

#### Filters

- Date range
- Time of day
- Location
- Species
- Size range (by weight or length)

#### Charts (Optional but valuable)
- Fish caught per month
- Species distribution (pie/bar)
- Location comparison
- Weight trend over time

## 3. Recommended Architecture

- Frontend: Vanilla JS + simple CSS framework (e.g., PicoCSS or Tailwind)
- Backend: Node.js + Express
- Database: SQLite (very good for local app)
- ORM: Prisma (strongly recommended)

This gives:
- Structure
- Migrations
- Type safety if using TypeScript later
- Easy expansion

## 4. Suggested Folder Structure

/server
  /routes
  /controllers
  /services
  /models
  app.js

/client
  /components
  /pages
  /utils
  index.html

Keep:
- Routes thin
- Logic inside services
- Validation centralized

## 5. Things You Might Have Missed (Optional, to implement later)

### Data Integrity

- Prevent deleting species that are used
- Cascade delete catches when session deleted
- Unique constraints where needed

### Performance

Add indexes on:
- session.date
- session.location
- catch.species_id

Even with SQLite, this matters later.

### Export & Backup

Very valuable feature:
- Export data to CSV
- Export full backup as JSON
- Import data
- This makes your app feel serious and useful.

### Weather Integration

Store:
- Weather conditions
- Temperature
- Wind

Later you can correlate:
- Fish caught vs weather
- Most productive conditions

### Geolocation Upgrade

Instead of free-text location:
- Use saved locations table
- Allow GPS coordinates
- Later integrate with map (Leaflet.js)

### Personal Best Tracking

Automatically compute:
- Personal best per species
- Average weight per species
- Top 5 largest fish ever
These are powerful motivation metrics.

## 6. MVP Definition (Important)

Keep version 1 very small.

### MVP should include:
- Create/edit/delete sessions
- Add catches to session
- Predefined species list
- Simple dashboard with:
- - Total fish
- - Total Sessions
- - Fish per location
- Basic filtering by date

Everything else is phase 2.

## 7. Good Development Strategy

### Step 1

Design database schema first.

### Step 2

Build REST API:

- GET /sessions
- POST /sessions
- GET /sessions/:id
- DELETE /sessions/:id
- POST /sessions/:id/catches
Test with Postman first.

### Step 3

Build simple frontend.

### Step 4

Add dashboard calculations in backend.
Avoid putting heavy calculations in frontend initially.

## 8. Maintainability Tips

- Use environment variables
- Separate config
- Add input validation (Zod or Joi)
- Use centralized error handling
- Log errors properly

## 9. Expansion Ideas (Optional, to implement later)

- User accounts
- Mobile-friendly PWA
- Offline support
- Sharing sessions
- Public leaderboard
- AI-based prediction of good fishing days
- Photo uploads
- Tackle tracking
- Bait performance tracking

## 10. Smart Improvements for Real-World Use

These are high-value additions:
- “Quick Add Catch” button
- Auto-fill last used bait
- Session duration tracking
- Catch rate (fish/hour)
- Favorite location tagging
- Seasonal statistics
- Notes search

## 11. Long-Term Scalability Path

If the project grows:
- Move SQLite → PostgreSQL
- Add authentication (JWT or session-based)
- Convert to TypeScript
- Possibly move frontend to React
Design now so this is easy later.

## 12. Final Recommendation

Do not overbuild v1.

Build a clean, structured backend with a strong data model.
Make UI simple but usable.
Focus on data integrity and extensibility.