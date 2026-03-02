# Sharing Point

A personal productivity and self-reflection dashboard built with React and Vite. It provides an intuitive interface for managing your daily tasks, analyzing your mood, setting goals, and tracking your personal development—all wrapped in a sleek iOS-inspired dark theme.

## Features

- **Dashboard:** A central hub displaying a quick overview of your mood, goals, tasks, and recent insights.
- **Mood Tracker:** Log your daily emotions with visual indicators and notes.
- **Goals Tracking:** Set, monitor, and visualize progress on short-term and long-term objectives.
- **Development Area:** Analyze your strengths, define areas for growth, and plan action steps.
- **Think Prompts:** Daily philosophical and critical thinking prompts to inspire self-reflection.
- **To-Do List:** A robust list manager to keep track of daily and upcoming tasks.
- **Notes (Normal Writing):** A clean, focused text editor for brainstorming, journaling, and saving personal notes with automatic timestamping.

## UI & Theme

The application features a minimalist **iOS Black Theme**, characterized by:
- A pitch-black canvas (`bg-black`)
- High-contrast pure white and zinc-toned text
- Sleek, semi-transparent components and soft borders (`zinc-800`, `zinc-900`)
- A sliding mobile-friendly sidebar navigation that gracefully tucks away to maximize screen space on both desktop and mobile views.

## Project Structure

The repository is structured to separate the client interface from the server logic:

```text
sharingPoint/
├── frontend/      # The React + Vite client application
└── backend/       # The Express.js server (currently a placeholder API)
```

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Running the Frontend

To start the React development server:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:5173/`

### Running the Backend

To start the basic Express server:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The server will run on port 5000 (usually `http://localhost:5000/api/status`).