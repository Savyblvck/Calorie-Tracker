# NutriPulse - Development Journal 📓

This journal explains how the project was built, step-by-step, in simple and plain language.

---

## 🎯 1. The Rules & Goals

The goal was to build a modern **Calorie & Macro Tracker** app using standard web technologies (**HTML**, **CSS**, and **JavaScript**).

**The Rules Followed:**
- **No Tailwind CSS**: All styling was written by hand from scratch.
- **No CSS Variables**: Used standard, direct color values (like `#38bdf8` or `rgba(...)`) instead of `--variables`.
- **Use WebStorage (`localStorage`)**: Saved all user data inside the browser so nothing is lost when refreshing or closing the page.

---

## 🛠️ 2. Step-by-Step Development

### Step 1: Planning the App Structure
Before writing code, I planned what key sections the app needed:
- A **Summary Dashboard** showing remaining calories, goal target, and a circular progress ring.
- A **Macronutrient Tracker** showing progress bars for Protein, Carbs, and Fats.
- 4 **Meal Categories**: Breakfast, Lunch, Dinner, and Snacks.
- A **Water Tracker** and **Exercise Burn Logger**.
- A **Date Switcher** to log past or future days.
- A **7-Day Analytics View** to view weekly calorie trends.

### Step 2: Building the Layout (`index.html`)
I created the structure of the application:
- Built the top bar with the brand logo, date navigation buttons, analytics button, and settings gear.
- Created cards for the calorie ring, macro progress bars, water tracker, and exercise logger.
- Built separate meal cards (Breakfast, Lunch, Dinner, Snacks) with an `+ Add` button for each.
- Created pop-up windows (modals) for logging food, adding exercise, changing goal settings, and viewing 7-day stats.

### Step 3: Designing the UI (`styles.css`)
I styled the app to look sleek, modern, and clean:
- **Theme**: Dark mode with subtle background glow spots and smooth translucent cards.
- **Colors**:
  - Sky Blue for Calories
  - Emerald Green for Protein
  - Amber Yellow for Carbs
  - Rose Red for Fats
  - Blue for Water
- **Responsive**: Adjusted layout so it works smoothly on both mobile phones and desktop computers.
- **Rule Check**: Verified that no Tailwind classes or CSS variables (`--*`) were used.

### Step 4: Adding Logic & Data Saving (`app.js`)
I wrote the JavaScript logic to make everything interactive:
- **Data Storage**: Connected the app to `localStorage` so goals, daily logs, and custom foods are saved automatically on your computer.
- **Calorie & Macro Math**: Programmed automatic calculations for remaining calories (`Goal - Consumed + Exercise Burned`) and macro percentages.
- **Circular Progress Ring**: Made the SVG ring update smoothly based on calorie progress.
- **Presets & Search**: Created a built-in list of popular foods (Eggs, Oatmeal, Chicken Breast, Salmon, Rice, Avocado, etc.) for 1-click logging, plus a search bar to filter them.
- **Custom Foods**: Allowed users to type in their own custom food items and save them to a personal library.
- **Water & Exercise**: Added quick `+250 ml` and `+500 ml` water buttons, plus a simple workout logger.
- **7-Day Chart**: Created a vertical bar chart showing calorie intake across the past 7 days.

### Step 5: Testing & Version Control
- Tested all buttons, date switching, food entries, and settings.
- Initialized Git and committed all project files with clear commit messages.

---

## 💡 Key Decisions Summary

1. **Vanilla Web Technologies (No Frameworks)**: Keeps the app super fast, lightweight, and easy to run without any installation or build steps.
2. **Glassmorphism Dark Theme**: Provides a clean, modern aesthetic that is easy on the eyes.
3. **100% Local Privacy**: Stores all user data locally in the browser — no signups, accounts, or servers required.
4. **Preset Food Catalog**: Reduces typing so users can log common meals with a single click.
