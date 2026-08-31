# NutriPulse - Development Journal 📓

This journal documents the step-by-step development process, design decisions, challenge resolution, and milestones achieved while building the **NutriPulse Calorie & Macro Tracker** web application.

---

## 📅 Timeline & Process Overview

```
[Phase 1: Requirements & Architecture] 
       ↓
[Phase 2: HTML Layout & Semantic Structure] 
       ↓
[Phase 3: Custom Styling & Dark Glassmorphism (No Tailwind / No CSS Vars)] 
       ↓
[Phase 4: JavaScript State Logic & WebStorage Persistence] 
       ↓
[Phase 5: Presets, Hydration, Exercise & 7-Day Analytics] 
       ↓
[Phase 6: Local Server Testing & Git Version Control]
```

---

## 🚀 Phase 1: Requirements Analysis & Planning

### 🎯 Requirements & Constraints
1. **Tech Stack**: HTML5, Vanilla JavaScript, Custom CSS3.
2. **Strict Rule 1**: **No Tailwind CSS** — Layout and styling must be hand-crafted from scratch.
3. **Strict Rule 2**: **No CSS Variables** — No `--custom-property` definitions or `var()` references.
4. **Data Persistence**: Use browser **`localStorage`** so user logs, hydration data, exercise burns, and target goals persist across page reloads without a backend server.

### 📋 Architecture Plan
- **Hero Dashboard**: Daily Calorie Overview featuring an interactive SVG circular progress ring and macronutrient progress indicators (Protein, Carbs, Fats).
- **Categorized Meals**: 4 distinct meal logs — Breakfast, Lunch, Dinner, and Snacks & Drinks.
- **Modals System**:
  - **Food Logging Modal**: Tabbed interface with **Presets Library**, **Custom Entry Form**, and **My Saved Foods**.
  - **Exercise Burn Modal**: Simple form to log workout calories burned.
  - **Settings & Goals Modal**: Adjust calorie, macro, and hydration targets anytime.
  - **7-Day Analytics Modal**: Historic intake visual bar chart.

---

## 🏗️ Phase 2: HTML5 Semantic Layout Construction (`index.html`)

- Structured header featuring logo, date switcher (`< Prev`, `DatePicker`, `Next >`, `Today`), analytics trigger button, and settings gear button.
- Constructed main dashboard grid with two primary sections:
  - **Summary Card**: SVG progress ring, remaining calorie number display, burned calorie subtext, and quick stat boxes.
  - **Macronutrients Card**: Progress bars and gram targets for Protein, Carbohydrates, and Fats.
- Added auxiliary card grid for **Hydration Tracking** (+250ml, +500ml, Reset) and **Exercise Burn Logging**.
- Built meal section cards with subtotal displays and "+ Add" triggers per category.
- Created modal structures with accessible close buttons, form inputs, tab buttons, and search filters.

---

## 🎨 Phase 3: Hand-Crafted Glassmorphism Styling (`styles.css`)

### Design Aesthetics & Visual Tokens
- **Background**: Deep dark navy/black (`#0b0f19`) enhanced with ambient radial background glows (`bg-glow`).
- **Cards**: Translucent glassmorphism (`background: rgba(20, 27, 44, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08)`).
- **Color Palette (Explicit Color Definitions)**:
  - Primary / Calorie Ring: `#38bdf8` (Sky Blue) & `#3b82f6` (Blue)
  - Protein: `#10b981` (Emerald Green)
  - Carbs: `#f59e0b` (Amber Yellow)
  - Fat: `#f43f5e` (Rose Red)
  - Water: `#0284c7` (Water Blue)
  - Exercise: `#a855f7` (Purple)

### 🚨 Constraint Verification
- Scanned stylesheet with search tools to verify **zero usage of CSS variables** (`--*`) and **zero Tailwind classes**.
- Ensured full responsiveness across mobile (<600px), tablet, and desktop viewports using media queries.

---

## ⚡ Phase 4: JavaScript Logic & WebStorage Architecture (`app.js`)

### Data Schema Design
All data is stored in `localStorage` across three distinct keys:
1. `nutripulse_settings`: `{ calorieGoal, proteinGoal, carbsGoal, fatGoal, waterGoal }`
2. `nutripulse_logs`: `{ "YYYY-MM-DD": { meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, water: 0, exercise: [] } }`
3. `nutripulse_saved_foods`: Custom user food library array.

### Core Dynamic Mechanics
- **SVG Ring Animation**: Programmed mathematical stroke-dashoffset interpolation:
  $$\text{circumference} = 2 \times \pi \times 90 \approx 565.48$$
  $$\text{offset} = \text{circumference} - \left(\frac{\text{netCalories}}{\text{goal}}\right) \times \text{circumference}$$
  Calculates over-goal state and shifts ring color to Rose Red (`#f43f5e`) when exceeding daily goal limits.
- **Macronutrient Metrics**: Dynamically computes gram totals and calorie contribution (`4 kcal/g` for protein/carbs, `9 kcal/g` for fats).
- **Date Switching**: Synchronizes calendar picker and date text navigation while instantly re-rendering logs for the selected date.

---

## 🌟 Phase 5: Features, Presets & Analytics

- **Presets Library**: Built a catalog of 16 common healthy foods (Oatmeal, Chicken Breast, Eggs, Rice, Salmon, Avocado, Protein Shake, etc.) with real-time search filtering.
- **Custom Foods Library**: Added a "Save to My Saved Foods" checkbox during custom food entry to build a reusable personal library.
- **Hydration Tracker**: Instant quick-add water intake buttons (+250ml, +500ml) with visual fill progress bar.
- **Exercise Burn Logger**: Subtracts workout calories from net intake (`Net = Consumed - Burned`).
- **7-Day Analytics Bar Chart**: Dynamically queries past 7 days relative to the selected date and renders vertical CSS bars displaying daily intake vs. calorie targets.

---

## ⚙️ Phase 6: Server Setup, Git & Documentation

1. **Local Web Server**:
   - Launched background HTTP server (`python3 -m http.server 8888`) for local testing at `http://localhost:8888`.
2. **Git Version Control**:
   - Initialized Git repository in `/Users/admin/Desktop/Calorie Tracker`.
   - Created initial commit containing `index.html`, `styles.css`, and `app.js`.
3. **Comprehensive Documentation**:
   - Created `README.md` detailing project scope, key features, target user personas, and design decisions.
   - Committed `README.md` and updated Git history with structured conventional commit messages.

---

## 💡 Lessons Learned & Key Takeaways

1. **Clean Code without CSS Variables**: Writing modular CSS without CSS variables requires disciplined color token management, but yields reliable, predictable styling.
2. **Frictionless UI Patterns**: Providing pre-filled food presets and quick water buttons significantly reduces logging friction for daily users.
3. **Zero-Backend Architecture**: Browser `localStorage` provides a surprisingly fast, private, and capable storage layer for personal tracking apps without setup complexity.
