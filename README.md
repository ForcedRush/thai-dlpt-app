# 🇹🇭 DLPT Thai Study App

A Defense Language Proficiency Test study app for Thai, with flashcards, AI-generated reading practice, mock reading & listening tests, and an AI tutor.

---

## Deploy to iPhone in 10 minutes (free)

### Step 1 — Put the code on GitHub

1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click **New repository**, name it `thai-dlpt-app`, set it to **Public**, click **Create**
3. On your computer, open Terminal and run:

```bash
cd thai-dlpt-app        # this folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/thai-dlpt-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 2 — Deploy to Vercel (free hosting)

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New → Project**
3. Select your `thai-dlpt-app` repository
4. Vercel auto-detects Vite. Leave all settings as default
5. Click **Deploy**
6. In ~60 seconds you get a live URL like: `https://thai-dlpt-app.vercel.app`

---

### Step 3 — Add Anthropic API key

The AI features (AI Reading Practice, AI Tutor) need an API key.

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an API key
2. In Vercel, go to your project → **Settings → Environment Variables**
3. Add: `VITE_ANTHROPIC_API_KEY` = your key
4. Redeploy

> **Note:** For a study tool used only by you, putting the key in the frontend is fine.
> For a shared/public app, add a small backend proxy (Vercel serverless function) so the key stays secret.

---

### Step 4 — Add to iPhone home screen

1. Open Safari on your iPhone (must be Safari, not Chrome)
2. Go to your Vercel URL
3. Tap the **Share** button (box with arrow pointing up)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **Add**

The app now appears on your home screen with the Thai flag icon and opens fullscreen like a native app.

---

## Run locally (optional)

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Project structure

```
thai-dlpt-app/
├── index.html          # Entry point with PWA/iPhone meta tags
├── vite.config.js      # Vite bundler config
├── package.json
├── public/
│   ├── manifest.json   # PWA manifest (makes it installable)
│   ├── icon-192.png    # Home screen icon
│   └── icon-512.png    # Home screen icon (large)
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Full app (flashcards, tests, tutor, etc.)
```

---

## Features

- **Flashcards** — 206 words from the official DLI Thai Basic Course glossary, ILR 1–3, with romanization toggle
- **AI Reading Practice** — Claude generates fresh Thai passages at any ILR level on any topic
- **Mock Reading Test** — 6 passages, 24 questions, 15-minute timer
- **Mock Listening Test** — 6 audio clips via text-to-speech, 24 questions, 15-minute timer
- **AI Tutor** — Chat with Claude about Thai grammar, vocab, tone marks, and DLPT strategy
