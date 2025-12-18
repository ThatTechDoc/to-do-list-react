# React To-Do List (Vite + Xano)

Exact port of the vanilla JS to-do app into **React + Vite**, keeping **same features & look**.

## Features

- Full CRUD via Xano REST API
- Dark / light theme toggle (persistent)
- Search + filter (All / Pending / Completed / Overdue)
- Sort by due date (earliest first)
- Overdue alerts: toast 5 min before + browser alert on load
- Responsive design (mobile first)
- No external state libraries (only React hooks)

## Tech

- React 18 + Vite (dev server & build)
- Pure CSS (no frameworks)
- Xano cloud backend

## Run Locally

```bash
# 1. clone / unzip
cd to-do-list-react

# 2. install
npm install

# 3. start dev server
npm run dev
# open http://localhost:5173
```
