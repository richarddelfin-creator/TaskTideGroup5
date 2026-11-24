# TaskTide — Group 5 Midterm Project

TaskTide is a Kanban-style task manager built with React, Vite, Tailwind CSS, React Router, Context API, and the JSONPlaceholder API.

## Features
- Three workflow columns: To Do, Doing, and Done
- Load starter todos from JSONPlaceholder (`/todos?_limit=8`)
- Create, edit, delete, search, and filter tasks
- Drag and drop tasks between columns
- Task detail route
- Browser notification reminders for tasks due today (while the app is open and permission is granted)
- Persistent task data using `localStorage`
- Responsive layout for desktop, tablet, and mobile

## Requirements
- Node.js 18+ recommended
- npm

## Setup
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
Upload the contents of the generated `dist/` folder to Hostinger's public web directory. Configure the hosting server to serve `index.html` for unknown routes so React Router routes work after refresh.

## API
JSONPlaceholder: https://jsonplaceholder.typicode.com/todos?_limit=8

The API is used to load initial demo tasks. New and edited tasks are stored locally in the browser; JSONPlaceholder is a demo API and does not persist these changes to its server.

## Main project structure
```text
src/
  components/   Sidebar, TaskCard, TaskForm, ReminderManager
  context/      TaskContext (global task state)
  hooks/        useFetch (custom API hook)
  pages/        Board, TaskDetails, About
  utils/        dataHelpers (data transformation and filtering)
  App.jsx
  main.jsx
  index.css
```

## Member roles
Update `MEMBERS.txt` with the four members' full names and assigned roles.

## Known limitations
- localStorage data is saved only in the current browser and device.
- Browser notifications require permission and a supported browser; reminders run while the app is open.
- JSONPlaceholder provides demo data; changes are not sent back to the API.
- If the browser storage is cleared, locally saved tasks are removed.

## Deployment
Hostinger URL: https://ornate-florentine-bb1d48.netlify.app/