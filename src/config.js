// Single source of truth for the backend URL.
//
// Locally (npm run dev) this falls back to your local Express server.
// In production (Netlify), set the env var VITE_API_URL in your Netlify
// site settings (Site configuration → Environment variables) to:
//   https://shopxexpress.onrender.com
// then trigger a redeploy — Vite bakes env vars in at build time, so
// changing them requires a new build, not just a refresh.
//
// If this project was created with Create React App instead of Vite,
// replace `import.meta.env.VITE_API_URL` below with
// `process.env.REACT_APP_API_URL` and prefix the Netlify env var with
// REACT_APP_ instead of VITE_.

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";