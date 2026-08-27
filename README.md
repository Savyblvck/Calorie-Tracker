# NutriPulse - Calorie & Macro Tracker 🥗

NutriPulse is a modern, responsive, dark-mode web application designed to help users track their daily calorie intake, macronutrients (Protein, Carbohydrates, Fats), hydration, and physical exercise burn seamlessly from any modern web browser.

Built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**, all application data persists locally on your device via **Web Storage (`localStorage`)** with zero backend or database required.

---

## ✨ Features

- 🎯 **Interactive Calorie Ring Summary**: Live SVG progress ring calculating net calories (`Consumed - Exercise Burn`) against your customizable daily target limit.
- 🥩 **Macronutrient Breakdown**: Dynamic color-coded progress bars for **Protein** (Emerald), **Carbohydrates** (Amber), and **Fats** (Rose), complete with gram and calorie totals.
- 🥗 **Categorized Meal Logging**: Log foods under 4 dedicated categories: **Breakfast**, **Lunch**, **Dinner**, and **Snacks & Drinks**.
- ⚡ **Preset Food Catalog & Search**: Built-in 1-click preset library containing popular foods (Oatmeal, Eggs, Chicken Breast, Salmon, Rice, Avocado, Protein Shakes, etc.) with real-time search filtering.
- ✍️ **Custom Entry & Saved Foods Library**: Create custom food entries and save your favorite meals for quick future logging.
- 💧 **Hydration Tracker**: Keep track of your daily water intake with convenient `+250 ml` and `+500 ml` quick-add buttons.
- 🏃‍♂️ **Exercise & Burn Logger**: Log workout activities and burned calories to adjust your net daily energy intake.
- 📅 **Date Navigator**: Effortlessly switch dates to log past/future days or pick a specific date via the calendar date picker.
- 📊 **7-Day Analytics View**: Visual historic bar chart comparing your past 7 days' calorie intake against your goal target.
- ⚙️ **Custom Target Settings**: Easily update your calorie goal, macronutrient distribution, and hydration target anytime.

---

## 🛠️ Technical Highlights & Constraints

- ⚡ **Framework-Free**: Built entirely with Vanilla HTML5, CSS3, and JavaScript.
- 🎨 **Custom Glassmorphism Styling**: Sleek, modern dark mode UI built from scratch **without Tailwind CSS** or **CSS Variables (`--custom-prop`)**.
- 💾 **100% Offline & Private**: Uses standard browser `localStorage` for persistent data management — no accounts, tracking, or cloud backend required.

---

## 🚀 Getting Started

### Option 1: Direct File Open
1. Double-click [index.html](file:///Users/admin/Desktop/Calorie%20Tracker/index.html) or drag it into any web browser.

### Option 2: Local HTTP Server
You can also run a lightweight server locally:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js http-server
npx http-server -p 8080
```
Then visit `http://localhost:8080` in your browser.

---

## 📂 Project Structure

```
Calorie Tracker/
├── index.html   # Main HTML layout, modal popups, and semantic UI structure
├── styles.css   # Dark glassmorphism stylesheet (custom CSS, zero CSS variables)
├── app.js       # App logic, localStorage persistence, search, analytics & rendering
└── README.md    # Documentation & usage instructions
```

---

## 🔒 Data Storage Keys

NutriPulse stores data in your browser's `localStorage` under these keys:
- `nutripulse_settings`: Stores daily calorie, macro, and hydration target goals.
- `nutripulse_logs`: Stores meal entries, water intake, and exercise logs organized by date (`YYYY-MM-DD`).
- `nutripulse_saved_foods`: Stores custom food items added to your personal food library.
