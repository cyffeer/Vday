# Valentine Proposal — React + Vite

This is a small React (Vite) frontend intended as a Valentine’s proposal site. It uses Tailwind CSS, React Router, Framer Motion, and a playful confetti effect. The project is ready for local development and deployment to Vercel.

Quick start

1. Install

```powershell
npm install
```

2. Run dev server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
```

Vercel deployment

1. Push this repo to GitHub (or connect your project to Vercel).
2. On Vercel, import the project and set the framework to "Vite" or detect automatically.
3. Use the build command: `npm run build` (or leave default), and output directory: `dist`.
4. Deploy.

Notes

- Replace `src/assets/romantic.mp3` with your own instrumental mp3 if you wish. The app handles missing audio gracefully.
- Memories images: put your photos into `src/assets/memories/` (jpg/png/webp). The `Memories` page auto-loads whatever is in that folder via Vite’s `import.meta.glob(..., { eager: true })`, so it works in dev and after deployment on Vercel.
- Alternative: you can also put images in `public/images/` and reference them as `/images/yourfile.jpg` (also works on Vercel).
