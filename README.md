# 3D Developer Portfolio

A modern, responsive portfolio built with **React**, **Vite**, **Three.js** (@react-three/fiber, @react-three/drei), **Framer Motion**, and **Tailwind CSS**. Dark theme, smooth animations, and an optional 3D hero scene.

## Features

- **Hero** — Full-screen 3D scene (torus knot + rings), animated intro, CTA buttons
- **About** — Parallax-style scroll, bio and skill highlights
- **Skills** — Categorized cards (Frontend, Backend, AI, Tools)
- **Projects** — Cards with hover effects and modal preview; GitHub/live links
- **Experience / Education** — Timeline with Framer Motion
- **Contact** — Form (EmailJS) and social links
- **3D toggle** — Nav button to enable/disable 3D (respects reduced motion & low-end devices)
- **Custom cursor** — Desktop only, hidden on touch
- **SEO** — Meta tags and semantic HTML

## Run locally

```bash
npm install
npm run dev
```

**PowerShell script errors?** If you see "running scripts is disabled on this system" when running `npm`, use **Command Prompt (cmd)** instead, or run:

```powershell
cmd /c "cd /d n:\portfolio && npm install"
cmd /c "cd /d n:\portfolio && npm run dev"
```

If you see peer dependency conflicts (e.g. React 19 vs @react-three/fiber), the project includes `.npmrc` with `legacy-peer-deps=true`; run `npm install` again.

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Deploy (Vercel / Netlify)

- **Vercel**: Connect repo, build command `npm run build`, output directory `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`.

No server needed; the app is static. Contact form uses EmailJS from the client (set env vars in the dashboard).

## Resume download

Place your resume PDF in the `public/` folder and name it **`resume.pdf`**. The "Download Resume" button will then offer it as `MOHAMED_NAFEEZ_Resume.pdf`. If the file is missing, the link will open in a new tab (or 404 until you add the file).

## Contact form (EmailJS)

1. Create an [EmailJS](https://www.emailjs.com/) account and add a service + email template.
2. Copy `.env.example` to `.env` and set:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. In your template, use variables like `{{from_name}}`, `{{from_email}}`, `{{message}}` (match the form field names in `Contact.jsx`).

## Project structure

```
src/
  components/   # Layout, Nav, Scene3D, CustomCursor
  sections/     # Hero, About, Skills, Projects, Experience, Contact
  data/         # portfolio.js (content)
  hooks/        # useReducedMotion, useMediaQuery
```

## 3D and performance

- The Hero 3D canvas is **lazy-loaded** (dynamic import).
- **useReducedMotion** disables 3D when the user prefers reduced motion or the device appears low-end (e.g. few CPU cores).
- You can always toggle 3D on/off via the nav button.

## Tech stack

- React 19 + Vite 7
- Three.js via @react-three/fiber and @react-three/drei
- Framer Motion
- Tailwind CSS
- EmailJS (optional)
