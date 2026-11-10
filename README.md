# KingLifts (PowerZone Gym)

A members' site for a gym. People sign up with an email OTP, log in, and get a dashboard with a workout plan and a diet and calorie calculator.

**Live:** https://kinglifts.vercel.app

> The API runs on Render's free tier, so the first login can take around 30 seconds while it wakes up.

## What's in it

- Sign-up with a one-time code sent to your email (expires after 5 minutes)
- Login with hashed passwords and JWT sessions
- Workout plan page
- Diet page with a calorie calculator

## Tech

Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Nodemailer, plain HTML/CSS/JS. Frontend on Vercel, API on Render.

## Run it locally

Copy `.env.example` to `.env` and fill it in, then:

```bash
npm install
npm run dev
```

The API starts on `http://localhost:5000`. Open `frontend/index.html` in a browser.
