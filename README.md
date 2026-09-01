# NutriPulse - Calorie & Macro Tracker

NutriPulse is a modern, responsive, dark-mode web application designed for effortless daily calorie tracking, macronutrient balance monitoring (Protein, Carbs, Fats), hydration logging, and exercise burn calculations — running 100% in your browser.

---

## What Is NutriPulse?

NutriPulse is a comprehensive, client-side web dashboard that gives you full visibility into your daily nutrition and energy balance. Key features include:

- **Daily Calorie Hero & SVG Progress Ring**: Displays real-time net calories (`Consumed - Exercise Burn`) against your personalized target goal.
- **Macronutrient Tracking**: Color-coded progress metrics for **Protein** (Emerald), **Carbohydrates** (Amber), and **Fats** (Rose) with automatic calorie contribution breakdown (`4 kcal/g` for P/C, `9 kcal/g` for F).
- **Categorized Meal Logging**: Log foods under 4 dedicated categories: **Breakfast**, **Lunch**, **Dinner**, and **Snacks & Drinks**.
- **Preset Catalog & Search**: 1-click logging for popular healthy foods (Eggs, Oatmeal, Chicken Breast, Salmon, Rice, Avocado, Protein Shakes, etc.) with real-time search filtering.
- **Custom Entries & Saved Library**: Add custom recipes and save your favorite meals to your personal library for quick re-use.
- **Hydration Tracker**: Monitor your daily water intake with convenient `+250 ml` and `+500 ml` quick-add buttons.
- **Exercise & Burn Logger**: Log workouts to offset your net energy intake.
- **Date Navigator & 7-Day Analytics**: Browse past or future days and view historic 7-day intake trends.

---

## Who Is It For?

NutriPulse was designed for a wide range of health, fitness, and tech-minded users:

1. **Fitness & Gym Enthusiasts**: Bodybuilders, runners, and athletes who need exact macronutrient ratios (Protein, Carbs, Fats) to support muscle building, cutting, or athletic performance.
2. **Everyday Healthy Eaters**: Anyone seeking a simple, frictionless tool to stay mindful of their daily calorie intake and hydration without paywalls or annoying ads.
3. **Privacy-Conscious Users**: Users who want complete control over their personal data. NutriPulse stores all records locally in your browser — no account signup, no cloud databases, and no external tracking.
4. **Developers & Designers**: Web developers looking for a clean, high-aesthetic reference project built strictly with Vanilla HTML5, CSS3, and JavaScript.

---

## Key Architectural & Design Decisions

### 1. Vanilla HTML, CSS, and JavaScript (Zero Framework Overhead)
- **Why**: Eliminates build steps, `npm install` bloat, and framework dependencies. The application loads instantly in any modern web browser without transpilation or bundle compilation.

### 2. Hand-Crafted Glassmorphism Styling (No Tailwind & No CSS Variables)
- **Why**: Built strictly using pure CSS without Tailwind CSS or CSS Custom Properties (`--variable`). Custom ambient glowing radial gradients, backdrop blur filters (`backdrop-filter: blur(16px)`), crisp translucent cards (`rgba(20, 27, 44, 0.75)`), and explicit color tokens ensure standard cross-browser performance and pristine visual presentation.

### 3. Client-Side Web Storage (`localStorage`)
- **Why**: Ensures 100% data privacy and offline accessibility. All settings, food logs, water records, exercise burns, and saved custom foods are stored under local keys (`nutripulse_settings`, `nutripulse_logs`, `nutripulse_saved_foods`).

### 4. Frictionless Logging with Presets & Saved Foods
- **Why**: Manual food logging often suffers from high user friction. NutriPulse solves this by combining instant 1-click preset catalog items, real-time search, and a "Save to My Saved Foods" checkbox for custom items.

### 5. Net Calorie Calculation Formula (`Consumed - Burned`)
- **Why**: Net energy balance accurately reflects daily metabolic balance. Calories burned through exercise automatically expand your remaining calorie budget in real time.

---

## Getting Started

### Option 1: Direct File Open
Double-click [index.html](file:///Users/admin/Desktop/Calorie%20Tracker/index.html) or drag it into any modern web browser.

### Option 2: Local HTTP Server
Run a lightweight local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js http-server
npx http-server -p 8080
```
Then navigate to `http://localhost:8080` in your web browser.

---

## Project Structure

```
Calorie Tracker/
├── index.html   # Main HTML layout, header, modal popups, progress rings, & meal sections
├── styles.css   # Dark glassmorphism stylesheet (custom CSS, zero CSS variables, zero Tailwind)
├── app.js       # App logic, localStorage persistence, date picker, search, analytics & rendering
└── README.md    # Project documentation, target audience & architectural design decisions
```
