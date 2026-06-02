<div align="center">

# ⚛️ React Marketplace

### A fully client-side e-commerce bookstore.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-emerald?style=for-the-badge)](https://react-marketplace-kappa.vercel.app/)

</div>

---

## ✨ Features

| | Feature |
|---|---|
| 🔐 | Auth system (register / login / logout) with localStorage persistence |
| 🛒 | Cart management — add, decrease quantity, place order |
| 🔍 | Filter books by category, price range, and sort order |
| 📖 | Product detail modal on demand |
| 🌗 | Light / Dark theme toggle |
| 🚫 | Protected routes and custom 404 / error pages |



---

## 🛠️ Tech Stack


| Layer | Technology | Version |
|---|---|---|
| Framework | ⚡ React + Vite | 19 / 8 |
| Language | 🔷 TypeScript | ~6.0 |
| Routing | 🗺️ React Router DOM | v7 |
| Server State | 🔄 TanStack React Query | v5 |
| Forms | 📋 React Hook Form | v7 |
| Styling | 🎨 Tailwind CSS | v4 |
| Icons | 🎯 Lucide React | latest |
| Notifications | 🔔 React Hot Toast | v2 |
| HTTP Client | 📡 Axios | v1 |
| Linting | 🧹 ESLint + Biome | latest |


---

## 🏗️ Architecture

The project follows a clean layered architecture:

```text
src/
├── 📡 api/ # Raw data access (localStorage simulation)
├── ⚙️ services/ # Business logic on top of API layer
├── 🔍 queries/ # TanStack Query hooks (read operations)
├── ✏️ mutations/ # TanStack Query hooks (write operations)
├── 🌐 providers/ # Global context providers (auth, theme, modal, filters)
├── 🧩 Features/ # Smart composite components (connected to state)
├── 🎨 Components/ # Dumb/presentational UI components
├── 📄 pages/ # Route-level page components
├── 🗂️ layouts/ # Header, Footer, wrapper layout
├── 🔷 types/ # Shared TypeScript types
└── 🛠️ utils/ # Route constants and helpers
```

### Key Design Decisions

- **No backend** — auth, cart, and theme state are persisted via `localStorage`
- **Context + React Query** — global UI state (theme, modal, filters) lives in Context providers; server/async state is managed by TanStack Query
- **Separation of concerns** — `api/` handles raw data, `services/` adds business logic, `queries/mutations/` expose them as hooks
- **Feature components** — composite components in `Features/` own data fetching and pass props down to pure `Components/`

---

## 📁 Pages

| Route | Page | Description |
|---|---|---|
| `/` | 🏠 Home | Browse and filter books |
| `/login` | 🔐 Login | Login & Register forms |
| `/cart` | 🛒 Cart | Cart items with order summary |
| `/profile` | 👤 Profile | User profile page |
| `*` | 🚫 404 | Not Found page |


---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```