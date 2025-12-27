# Smart Canteen — Client

Overview
--------
This is the frontend for the Smart Canteen web app built with React + Vite. It provides the UI used by customers and admins to browse food, manage cart and checkout.

Live site
---------
https://smart-canteen-3628c.firebaseapp.com/

Quick start
-----------
Prerequisites:
- Node.js (14+)
- npm or yarn

Install and run locally:

```bash
cd "F:\web projects\smart-centeen\smart-canteen-client"
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Configuration
-------------
- Firebase config is in [smart-canteen-client/src/config/firebase.config.js](smart-canteen-client/src/config/firebase.config.js#L1). Update the Firebase keys there for local development or use environment variables if preferred.
- If Stripe or other keys are required, check `package.json` and components under `src/components/StripeProvider`.

Notes
-----
- Uses Vite dev server on default port (usually 5173). If that port is busy, set `PORT` when running the dev server.
- If you see errors about missing env values, ensure required keys are present in the Firebase config or environment.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
