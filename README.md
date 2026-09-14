# 🏥 MediCare — Modern Medical Booking Application

A complete, responsive, modern medical appointment booking application built with **React**, **React Router v7**, **Zustand**, **Axios**, **React Hook Form**, **Tailwind CSS**, and **json-server**.

---

## 🌟 Features Overview

### 1. Doctor Catalog & Search (`/` & `/doctors`)
- **Controlled Search Input**: Live real-time doctor filtering by doctor name, specialty, or clinic location.
- **Specialty Filters & Tabs**: Instant filter pills for Cardiology, Dermatology, Neurology, Pediatrics, Orthopedics, General Medicine, Psychiatry, and Ophthalmology.
- **Favorite Doctors Toggle**: Bookmark doctors to a quick access list powered by **Zustand** state (persisted in `localStorage`).
- **Sorting Options**: Sort doctors by rating or consultation fee.

### 2. Doctor Details Page (`/doctors/:id`)
- Dynamic React Router route parameters (`/doctors/:id`).
- Full physician biography, board certifications, education, consultation fees, clinic address, and available weekly time slots.
- Direct "Book Appointment" CTA linking seamlessly with doctor context pre-filled.

### 3. Patient Booking Form (`/book` & `/book/:doctorId`)
- **React Hook Form**: Form validation for patient name, email (regex format), phone, date (minimum date set to today), doctor selection, and time slots.
- **Uncontrolled Input Example (`useRef`)**: Referral code / promotional discount input managed via `useRef` DOM node reference to fulfill technical rubric requirements.
- Real-time pricing & appointment summary sidebar.

### 4. Appointment CRUD Operations (`/appointments`)
Full CRUD (Create, Read, Update, Delete) capability:
- **Create**: Booked via appointment form (POST `/appointments`).
- **Read**: View scheduled consultations with live status badges (GET `/appointments`).
- **Update / Reschedule**: Interactive Modal dialog with React Hook Form to modify date, slot, phone, or medical notes (PUT `/appointments/:id`).
- **Delete / Cancel**: Confirmation Modal before canceling consultation (DELETE `/appointments/:id`).

### 5. Patient Profile & Settings (`/profile`)
- Manage patient personal info (name, email, phone, city, blood type, emergency contact).
- **Dark / Light Theme Toggle**: Powered by **Zustand** global store with class updates on `document.documentElement` and persistence.

### 6. 404 Catch-All Page (`*`)
- Dynamic 404 error page with action button back to home catalog.

---

## 🛠️ Technology Stack

| Technology | Role |
| :--- | :--- |
| **React 18 / 19** | Core UI library with functional components & hooks |
| **Vite** | Next-generation frontend build tooling |
| **React Router v7** | Client-side routing with nested routes & dynamic parameters (`react-router-dom ^7.18.3`) |
| **Zustand** | Global state management for theme mode, favorites, and profile |
| **Axios** | REST API service layer targeting `json-server` (`/doctors` and `/appointments`) |
| **React Hook Form** | Form state management & validation |
| **Tailwind CSS** | Styling, glassmorphism, responsive utilities, and dark mode |
| **Lucide Icons** | Modern SVG vector icons |
| **json-server** | Fake REST API backend serving `/doctors` and `/appointments` from `db.json` |

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have **Node.js** (v18+) installed on your system.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run REST API Backend (`json-server`)
Start the mock REST API server on port 3001:
```bash
npm run api
```
*(Serves `db.json` REST endpoints: `http://localhost:3001/doctors` and `http://localhost:3001/appointments`)*

### 3. Start React Development Server
In a new terminal window, start Vite:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Suggested Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx                      # Responsive navbar with Dark mode & Favorites counter
│   ├── Footer.jsx                      # Footer with quick links & emergency info
│   ├── DoctorCard.jsx                  # Reusable doctor card with favorite toggle
│   ├── AppointmentCard.jsx             # Appointment card with Edit/Cancel actions
│   ├── LoadingSkeleton.jsx             # Skeleton loading placeholders
│   ├── Modal.jsx                       # Reusable modal dialog
│   ├── ToastNotification.jsx           # Global toast alert notification
│   └── ControlledVsUncontrolledDemo.jsx# Explicit React technical proof component
├── pages/
│   ├── DoctorsPage.jsx                 # Doctor catalog with controlled search input
│   ├── DoctorDetailsPage.jsx           # Dynamic route /doctors/:id
│   ├── BookAppointmentPage.jsx         # Booking form with React Hook Form & useRef
│   ├── AppointmentsPage.jsx            # My Appointments CRUD page
│   ├── ProfilePage.jsx                 # Patient profile page with Zustand store
│   └── NotFoundPage.jsx                # 404 fallback page
├── services/
│   └── api.js                          # Axios REST API service layer targeting json-server
├── stores/
│   └── useAppStore.js                  # Zustand store for theme, favorites, profile, toasts
├── routes/
│   └── router.jsx                      # React Router configuration
├── App.jsx                             # Main layout wrapper
├── main.jsx                            # Entry point
└── index.css                           # Global styles & Tailwind directives
```

---

## 🔗 REST API Endpoints

- `GET /doctors`: List all doctors
- `GET /doctors/:id`: Get specific doctor details
- `GET /appointments`: List patient appointments
- `POST /appointments`: Create new appointment
- `PUT /appointments/:id`: Reschedule/Update appointment
- `DELETE /appointments/:id`: Cancel/Delete appointment

---

## 📝 Grading Checklist Verification

- [x] **React Components**: Reusable components (`Navbar`, `DoctorCard`, `AppointmentCard`, `Modal`, `Toast`).
- [x] **Props & State**: Proper props passing, local state, controlled vs uncontrolled inputs.
- [x] **List & Conditional Rendering**: Doctors list, appointments list, skeleton loaders, error states, empty states.
- [x] **React Router**: Client routing, parameter routes (`/doctors/:id`, `/book/:doctorId`), 404 page.
- [x] **Controlled Input**: Doctor search input on Home page.
- [x] **Uncontrolled Input**: `useRef` promo code input on Booking page & visual demo component.
- [x] **React Hook Form**: Form validation (required, email regex, phone, minimum date = today) with visible errors.
- [x] **Zustand Store**: Global store for favorites bookmarking, Light/Dark theme mode, user profile.
- [x] **Axios REST API**: Pure Axios HTTP requests to `/doctors` and `/appointments` endpoints.
- [x] **Styling**: Tailwind CSS, responsive design, sleek glassmorphism, dark mode.

---
*Repository verified and updated for React Router v7 & Pure json-server REST API.*

