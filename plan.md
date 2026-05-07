# 🐍 SE Student Loyalty Test — Snake Detector

> **A fun, viral quiz app for Software Engineering students (Session 2024–2028)**
> Determine if you're a **Certified Snake 😈** or a **Loyal Legend 💙**

---

## 📋 Table of Contents

- [Goal](#-goal)
- [Tech Stack](#-tech-stack)
- [Quiz Questions](#-quiz-questions)
- [Scoring Logic](#-scoring-logic)
- [User Input & Anti-Cheat](#-user-input--anti-cheat)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Pages](#-pages)
- [UI/UX Design](#-uiux-design)
- [Folder Structure](#-folder-structure)
- [Deployment](#-deployment)
- [Viral Features](#-viral-features)
- [Monetization](#-monetization-optional)
- [Development Phases](#-development-phases)

---

## 🎯 Goal

Build a **simple, viral quiz web app** with only **5 questions** that classifies SE students into:

| Result | Condition |
|---|---|
| 🐍 **Certified Snake 😈** | `snakeScore > loyaltyScore` |
| 🏅 **Loyal Legend 💙** | `loyaltyScore >= snakeScore` |

**Key Principles:**
- Fun & entertainment **only** — no serious intent
- Lightweight, fast, optimized for **Vercel**
- Mobile-first, meme-driven UI
- Shareable results for virality

---

## ⚙️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR, API routes, Vercel-native |
| **Styling** | Tailwind CSS | Rapid UI, responsive, dark mode |
| **Backend** | Next.js API Routes | Serverless on Vercel |
| **Database** | MongoDB Atlas (Free Tier) | Flexible schema, free 512MB |
| **ODM** | Mongoose | Schema validation, easy queries |
| **Hosting** | Vercel | Free tier, auto-deploy from GitHub |
| **Icons/Emojis** | Native emojis + Lucide React | Lightweight, no extra deps |

### Alternative DB Option
- **Firebase Firestore** (free tier) — if MongoDB isn't preferred

---

## 🧠 Quiz Questions

### Question 1: Assignment Sharing
> *"Your friend asks for your assignment 1 hour before deadline. You..."*

| Option | Label | Points |
|---|---|---|
| A | "Send it instantly and say 'change the variables bro'" | 🐍 Snake (+2) |
| B | "Explain the concept so they can do it themselves" | 🏅 Loyal (+2) |
| C | "Say you haven't done it either (even though you have)" | 🐍 Slight Snake (+1) |
| D | "Leave them on seen" | ⚪ Neutral (0) |

### Question 2: Group Project Behavior
> *"In a group project, your role is..."*

| Option | Label | Points |
|---|---|---|
| A | "Do nothing and add your name on the last slide" | 🐍 Snake (+2) |
| B | "Take the lead and divide work fairly" | 🏅 Loyal (+2) |
| C | "Do minimal work but hype it like you did everything" | 🐍 Slight Snake (+1) |
| D | "Just do whatever is assigned, no more no less" | ⚪ Neutral (0) |

### Question 3: Secret Sharing
> *"Your friend tells you a secret. Next day..."*

| Option | Label | Points |
|---|---|---|
| A | "The whole batch knows because 'bro it just slipped'" | 🐍 Snake (+2) |
| B | "You take it to the grave" | 🏅 Loyal (+2) |
| C | "Tell only your 'best friend' (who tells everyone)" | 🐍 Slight Snake (+1) |
| D | "Forget about it because you don't care" | ⚪ Neutral (0) |

### Question 4: Last Night Before Exam
> *"It's the night before the final exam. Your friend calls for help..."*

| Option | Label | Points |
|---|---|---|
| A | "Give them wrong notes on purpose 💀" | 🐍 Snake (+2) |
| B | "Stay up and teach them everything you know" | 🏅 Loyal (+2) |
| C | "Share notes but hide the important topics" | 🐍 Slight Snake (+1) |
| D | "Don't pick up the phone" | ⚪ Neutral (0) |

### Question 5: Class Notes
> *"You made amazing notes for the whole semester. Someone asks to copy them..."*

| Option | Label | Points |
|---|---|---|
| A | "Sell them or trade for something" | 🐍 Snake (+2) |
| B | "Share freely with everyone in the class" | 🏅 Loyal (+2) |
| C | "Share but remove some key pages first" | 🐍 Slight Snake (+1) |
| D | "Say 'I'll send later' and never do" | ⚪ Neutral (0) |

---

## 🧮 Scoring Logic

### Point System

| Answer Type | Points Added To |
|---|---|
| 🐍 Snake | `snakeScore += 2` |
| 🐍 Slight Snake | `snakeScore += 1` |
| 🏅 Loyal | `loyaltyScore += 2` |
| ⚪ Neutral | No points added |

### Score Range
- **Max Snake Score:** 10 (all snake answers)
- **Max Loyalty Score:** 10 (all loyal answers)
- **Min Score:** 0 (all neutral)

### Result Determination

```javascript
if (snakeScore > loyaltyScore) {
  result = "Certified Snake 😈"
} else {
  result = "Loyal Legend 💙"
}
```

### Result Messages (Meme-style)

**Certified Snake 😈:**
- "Bro really chose violence every time 💀"
- "Your friends need to watch their backs fr fr"
- "Saanp nikla tu toh 🐍"

**Loyal Legend 💙:**
- "You're the friend everyone deserves but few have 👑"
- "Certified Real One™ — protect this human at all costs"
- "Tera koi nahi kata bhai, tu sahi banda hai 💪"

---

## 🔐 User Input & Anti-Cheat

### Required Fields

| Field | Type | Validation |
|---|---|---|
| Name | `string` | Min 2 chars, max 50 chars, required |
| Roll Number | `string` | Unique, required, format validation |

### Anti-Cheat Rules
1. **One submission per roll number** — enforced at DB level (unique index)
2. **Server-side validation** — never trust client data
3. **Duplicate check** before insert — return existing result if already submitted
4. **Rate limiting** — basic IP-based throttle on API routes (optional)

### Flow
```
User enters name + roll → Check if roll exists in DB
  → YES: Redirect to existing result page
  → NO: Start quiz → Submit answers → Calculate score → Save → Show result
```

---

## 💾 Database Schema

### Collection: `users`

```typescript
interface User {
  _id: ObjectId;              // MongoDB auto-generated
  name: string;               // Student name
  rollNumber: string;         // Unique identifier
  answers: Answer[];          // Array of 5 answers
  snakeScore: number;         // Calculated snake score (0-10)
  loyaltyScore: number;       // Calculated loyalty score (0-10)
  result: string;             // "Certified Snake 😈" | "Loyal Legend 💙"
  createdAt: Date;            // Submission timestamp
}

interface Answer {
  questionId: number;         // 1-5
  selectedOption: string;     // "A" | "B" | "C" | "D"
  type: string;               // "snake" | "loyal" | "slight_snake" | "neutral"
  points: number;             // 0, 1, or 2
}
```

### Indexes
```javascript
{ rollNumber: 1 }  // Unique index for anti-cheat
{ result: 1 }      // For leaderboard queries
{ createdAt: -1 }   // For sorting by newest
```

---

## 📡 API Routes

### `POST /api/submit`
Submit quiz answers and get result.

**Request Body:**
```json
{
  "name": "Ahsaan",
  "rollNumber": "2024-SE-001",
  "answers": [
    { "questionId": 1, "selectedOption": "B" },
    { "questionId": 2, "selectedOption": "A" },
    { "questionId": 3, "selectedOption": "B" },
    { "questionId": 4, "selectedOption": "C" },
    { "questionId": 5, "selectedOption": "B" }
  ]
}
```

**Response (201 — Created):**
```json
{
  "success": true,
  "result": "Loyal Legend 💙",
  "snakeScore": 3,
  "loyaltyScore": 6,
  "rollNumber": "2024-SE-001"
}
```

**Response (409 — Duplicate):**
```json
{
  "success": false,
  "message": "Roll number already submitted",
  "rollNumber": "2024-SE-001"
}
```

### `GET /api/result?roll=2024-SE-001`
Fetch result for a specific roll number.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "name": "Ahsaan",
    "rollNumber": "2024-SE-001",
    "snakeScore": 3,
    "loyaltyScore": 6,
    "result": "Loyal Legend 💙",
    "createdAt": "2026-05-07T18:00:00Z"
  }
}
```

### `GET /api/leaderboard`
Get top snakes and loyal students.

**Response (200):**
```json
{
  "success": true,
  "totalParticipants": 42,
  "snakes": 18,
  "loyals": 24,
  "topSnakes": [],
  "topLoyals": []
}
```

---

## 🎨 Pages

### Page 1: Home — `/`
- Hero section with snake emoji animation
- App title: **"SE Student Loyalty Test 🐍"**
- Subtitle: *"Are you a Snake or a Legend? Let's find out..."*
- Input fields: Name + Roll Number
- "Start Test" button
- If roll already exists → redirect to result

### Page 2: Quiz — `/quiz`
- One question at a time (step-by-step)
- Progress bar (1/5, 2/5... 5/5)
- Animated transitions between questions
- Option cards with hover effects
- "Next" button (disabled until option selected)
- Final question → "Submit" button

### Page 3: Result — `/result/[roll]`
- Large result badge (Snake 😈 or Legend 💙)
- Score breakdown (snake vs loyalty bar chart)
- Funny meme message
- "Share on WhatsApp" button
- "Check Another Friend" button → back to home

### Page 4: Leaderboard — `/leaderboard` (Optional)
- Total participants count
- Snake vs Loyal ratio pie chart
- Top 10 snakes list
- Top 10 loyals list
- Fun stats section

---

## 🎭 UI/UX Design

### Theme
- **Dark mode** as default
- Primary: Deep purple (`#7C3AED`) + Snake green (`#10B981`)
- Background: Dark navy (`#0F172A`)
- Cards: Glassmorphism with subtle blur
- Accent: Neon glow effects on results

### Typography
- Headings: **Inter** or **Space Grotesk** (Google Fonts)
- Body: **Inter**
- Meme text: Bold + emoji heavy

### Animations
- Snake emoji slithering on home page
- Card flip on option select
- Confetti on "Loyal Legend" result
- Skull rain on "Snake" result
- Smooth page transitions

### Mobile Responsive
- Stack layout on mobile
- Full-width cards
- Touch-friendly buttons (min 48px tap target)
- Bottom-sheet style on mobile quiz

---

## 📁 Folder Structure

```
memes/
├── app/
│   ├── layout.tsx              # Root layout with metadata + fonts
│   ├── page.tsx                # Home page (name + roll input)
│   ├── globals.css             # Tailwind + custom styles
│   ├── quiz/
│   │   └── page.tsx            # Quiz page (5 questions)
│   ├── result/
│   │   └── [roll]/
│   │       └── page.tsx        # Dynamic result page
│   └── leaderboard/
│       └── page.tsx            # Leaderboard page
│
├── app/api/
│   ├── submit/
│   │   └── route.ts            # POST - Submit quiz
│   ├── result/
│   │   └── route.ts            # GET - Fetch result
│   └── leaderboard/
│       └── route.ts            # GET - Leaderboard data
│
├── components/
│   ├── QuizCard.tsx            # Individual question card
│   ├── OptionButton.tsx        # Answer option button
│   ├── ProgressBar.tsx         # Quiz progress indicator
│   ├── ResultBadge.tsx         # Snake/Loyal result display
│   ├── ScoreChart.tsx          # Score breakdown visual
│   ├── ShareButton.tsx         # WhatsApp share component
│   └── SnakeAnimation.tsx      # Fun snake CSS animation
│
├── lib/
│   ├── mongodb.ts              # MongoDB connection singleton
│   ├── models/
│   │   └── User.ts             # Mongoose User model
│   ├── questions.ts            # Quiz questions data
│   ├── scoring.ts              # Score calculation logic
│   └── constants.ts            # Result messages, config
│
├── public/
│   ├── snake.png               # Snake emoji image
│   ├── crown.png               # Crown/loyal image
│   └── og-image.png            # Social media preview image
│
├── .env.local                  # Environment variables
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── package.json
└── README.md
```

---

## 🚀 Deployment (Vercel)

### Prerequisites
- GitHub repository created
- MongoDB Atlas cluster set up (free M0 tier)
- Vercel account linked to GitHub

### Environment Variables
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/snake-detector
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### Steps
1. `npx create-next-app@latest ./ --typescript --tailwind --app --src-dir=false --import-alias="@/*" --eslint`
2. Install dependencies: `npm install mongoose`
3. Build & test locally: `npm run dev`
4. Push to GitHub: `git push origin main`
5. Connect repo to Vercel dashboard
6. Add env variables in Vercel → Settings → Environment Variables
7. Deploy → Vercel auto-builds on push

### Vercel Optimizations
- Edge-compatible API routes where possible
- ISR for leaderboard page (revalidate every 60s)
- Image optimization via `next/image`
- Metadata API for SEO + OG tags

---

## 📈 Viral Features

| Feature | Implementation |
|---|---|
| **WhatsApp Share** | Pre-formatted message with result + link |
| **Screenshot-friendly** | Result page designed as a card — easy to screenshot |
| **Funny Messages** | Random meme captions on result page |
| **Social Proof** | Show total participants count |
| **OG Image** | Dynamic OG image with result for link previews |

### WhatsApp Share Template
```
🐍 SE Snake Detector Result 🐍

Name: {name}
Result: {result}

Snake Score: {snakeScore}/10
Loyalty Score: {loyaltyScore}/10

Take the test yourself 👇
{url}
```

---

## 💰 Monetization (Optional — Phase 7+)

- **Google AdSense**: Banner ad on result page (non-intrusive)
- **Meme Banners**: Fun sponsor-style meme ads
- **Premium**: "Detailed Snake Analysis" for ₹10 (joke feature)

---

## 🧩 Development Phases

| Phase | Description | Timeline |
|---|---|---|
| **Phase 1** | Project setup + Home page UI + 5 question cards | Day 1 |
| **Phase 2** | Scoring logic + Quiz flow (step-by-step navigation) | Day 1-2 |
| **Phase 3** | MongoDB setup + API routes (submit, result) | Day 2 |
| **Phase 4** | Result page with dynamic messages + score chart | Day 2-3 |
| **Phase 5** | Deploy to Vercel + test with real users | Day 3 |
| **Phase 6** | WhatsApp sharing + meme messages + polish | Day 3-4 |
| **Phase 7** | Leaderboard page (optional) | Day 4+ |

---

## ✅ Acceptance Criteria

- [ ] User can enter name + roll number on home page
- [ ] Quiz shows 5 questions one at a time with progress bar
- [ ] Each question has 4 clickable options
- [ ] Scoring calculates correctly (snake vs loyal)
- [ ] Result saved to MongoDB with unique roll number enforcement
- [ ] Duplicate roll numbers are rejected with redirect to existing result
- [ ] Result page shows correct verdict with funny message
- [ ] WhatsApp share button works with pre-filled message
- [ ] Fully responsive on mobile devices
- [ ] Dark mode UI with meme aesthetics
- [ ] Deployed and accessible on Vercel

---

## 📝 Notes

- This project is **strictly for fun** — no malicious intent
- All questions are light-hearted and based on common student experiences
- No personal data beyond name + roll number is collected
- Results are meant to be humorous, not serious personality assessments

---

> **Built with 💚 by SE Session 2024–2028**
> *"Sab ke andar ek chhota sa saanp hota hai 🐍"*
