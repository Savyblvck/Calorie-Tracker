/**
 * NutriPulse - Calorie & Macro Tracker App Logic
 * Uses localStorage for persistent storage.
 */

// ==================== PRESET FOODS DATA ====================
const PRESET_FOODS = [
    { name: 'Oatmeal with Milk & Berries', serving: '1 bowl (250g)', calories: 280, protein: 12, carbs: 45, fat: 5 },
    { name: 'Grilled Chicken Breast', serving: '200g cooked', calories: 330, protein: 62, carbs: 0, fat: 7 },
    { name: 'Hard Boiled Eggs', serving: '2 large eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { name: 'Brown Rice', serving: '1 cup cooked (195g)', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Avocado Toast on Whole Grain', serving: '1 slice (120g)', calories: 290, protein: 7, carbs: 28, fat: 18 },
    { name: 'Banana', serving: '1 medium (118g)', calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { name: 'Whey Protein Shake', serving: '1 scoop (30g)', calories: 140, protein: 25, carbs: 3, fat: 2 },
    { name: 'Greek Yogurt with Honey', serving: '1 cup (200g)', calories: 200, protein: 18, carbs: 22, fat: 4 },
    { name: 'Baked Salmon Fillet', serving: '180g fillet', calories: 370, protein: 36, carbs: 0, fat: 23 },
    { name: 'Mixed Almonds & Walnuts', serving: 'Handful (30g)', calories: 170, protein: 6, carbs: 6, fat: 15 },
    { name: 'Fresh Garden Salad & Olive Oil', serving: '1 bowl (150g)', calories: 160, protein: 3, carbs: 10, fat: 12 },
    { name: 'Protein Bar (Chocolate)', serving: '1 bar (60g)', calories: 210, protein: 20, carbs: 22, fat: 7 },
    { name: 'Whole Milk', serving: '1 glass (250ml)', calories: 150, protein: 8, carbs: 12, fat: 8 },
    { name: 'Apple', serving: '1 medium (182g)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Whole Wheat Pasta', serving: '1 cup cooked', calories: 220, protein: 8, carbs: 43, fat: 1.3 },
    { name: 'Peanut Butter Toast', serving: '1 slice with 2 tbsp', calories: 280, protein: 10, carbs: 24, fat: 16 }
];

// ==================== STATE MANAGEMENT ====================
let currentDate = getTodayDateString();
let selectedMealCategory = 'breakfast'; // default active category for adding

// Default Goals Settings
let settings = {
    calorieGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 220,
    fatGoal: 65,
    waterGoal: 2000
};

// Logs Store Structure: { "YYYY-MM-DD": { meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, water: 0, exercise: [] } }
let logs = {};

// User Custom Saved Foods Library
let savedFoods = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadLogs();
    loadSavedFoods();
    initEventListeners();
    updateDateDisplay();
    renderUI();
});

// Helper: Format Date object to YYYY-MM-DD
function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Load / Save LocalStorage
function loadSettings() {
    const stored = localStorage.getItem('nutripulse_settings');
    if (stored) {
        try { settings = { ...settings, ...JSON.parse(stored) }; } catch (e) { console.error(e); }
    }
}

function saveSettings() {
    localStorage.setItem('nutripulse_settings', JSON.stringify(settings));
}

function loadLogs() {
    const stored = localStorage.getItem('nutripulse_logs');
    if (stored) {
        try { logs = JSON.parse(stored); } catch (e) { console.error(e); }
    }
}

function saveLogs() {
    localStorage.setItem('nutripulse_logs', JSON.stringify(logs));
}

function loadSavedFoods() {
    const stored = localStorage.getItem('nutripulse_saved_foods');
    if (stored) {
        try { savedFoods = JSON.parse(stored); } catch (e) { console.error(e); }
    }
}

function saveSavedFoods() {
    localStorage.setItem('nutripulse_saved_foods', JSON.stringify(savedFoods));
}

// Helper: Ensure log structure exists for a specific date
function getLogForDate(dateStr) {
    if (!logs[dateStr]) {
        logs[dateStr] = {
            meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
            water: 0,
            exercise: []
        };
    }
    return logs[dateStr];
}

// ==================== DATE NAVIGATION ====================
function updateDateDisplay() {
    const datePicker = document.getElementById('date-picker');
    const dateDisplayText = document.getElementById('date-display-text');
    
    datePicker.value = currentDate;
    
    const todayStr = getTodayDateString();
    if (currentDate === todayStr) {
        dateDisplayText.textContent = 'Today';
    } else {
        const dateObj = new Date(currentDate + 'T00:00:00');
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        dateDisplayText.textContent = dateObj.toLocaleDateString('en-US', options);
    }
}

function changeDateByDays(offset) {
    const d = new Date(currentDate + 'T00:00:00');
    d.setDate(d.getDate() + offset);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    currentDate = `${year}-${month}-${day}`;
    updateDateDisplay();
    renderUI();
}

// ==================== CORE RENDER UI ====================
function renderUI() {
    const currentLog = getLogForDate(currentDate);

    // Calculate totals
    let totalCaloriesLogged = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    const meals = currentLog.meals;
    
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
        const mealItems = meals[mealType] || [];
        let mealCal = 0;
        let mealP = 0, mealC = 0, mealF = 0;

        mealItems.forEach(item => {
            mealCal += Number(item.calories) || 0;
            mealP += Number(item.protein) || 0;
            mealC += Number(item.carbs) || 0;
            mealF += Number(item.fat) || 0;
        });

        totalCaloriesLogged += mealCal;
        totalProtein += mealP;
        totalCarbs += mealC;
        totalFat += mealF;

        // Render meal cards
        renderMealCard(mealType, mealItems, mealCal);
    });

    // Exercise burn
    let totalBurned = 0;
    (currentLog.exercise || []).forEach(ex => {
        totalBurned += Number(ex.calories) || 0;
    });

    // Net calories
    const netCalories = totalCaloriesLogged - totalBurned;
    const remainingCalories = settings.calorieGoal - netCalories;

    // Update Calorie Summary Ring
    const remainingValEl = document.getElementById('remaining-calories');
    const remainingLabelEl = document.getElementById('remaining-label');
    const burnedTextEl = document.getElementById('burned-text');
    const netStatusPill = document.getElementById('net-status-pill');

    if (remainingCalories >= 0) {
        remainingValEl.textContent = remainingCalories.toLocaleString();
        remainingLabelEl.textContent = 'kcal remaining';
    } else {
        remainingValEl.textContent = Math.abs(remainingCalories).toLocaleString();
        remainingLabelEl.textContent = 'kcal over goal';
    }

    burnedTextEl.textContent = `🔥 ${totalBurned.toLocaleString()} kcal burned`;
    netStatusPill.textContent = `Net: ${netCalories.toLocaleString()} kcal`;

    document.getElementById('target-calories-val').textContent = settings.calorieGoal.toLocaleString();
    document.getElementById('consumed-calories-val').textContent = totalCaloriesLogged.toLocaleString();
    document.getElementById('burned-calories-val').textContent = totalBurned.toLocaleString();
    document.getElementById('day-totals-pill').textContent = `Total: ${totalCaloriesLogged.toLocaleString()} kcal`;

    // SVG Ring Calculations
    const ringCircle = document.getElementById('calorie-progress-ring');
    const radius = 90;
    const circumference = 2 * Math.PI * radius; // ~565.48
    const percent = Math.min(100, Math.max(0, (netCalories / settings.calorieGoal) * 100));
    const offset = circumference - (percent / 100) * circumference;

    ringCircle.style.strokeDasharray = `${circumference}`;
    ringCircle.style.strokeDashoffset = `${offset}`;
    
    if (netCalories > settings.calorieGoal) {
        ringCircle.style.stroke = '#f43f5e';
    } else {
        ringCircle.style.stroke = '#38bdf8';
    }

    // Update Macro Progress
    renderMacroItem('protein', totalProtein, settings.proteinGoal, 4);
    renderMacroItem('carbs', totalCarbs, settings.carbsGoal, 4);
    renderMacroItem('fat', totalFat, settings.fatGoal, 9);

    // Update Water
    const waterCurrent = currentLog.water || 0;
    document.getElementById('water-status-text').textContent = `${waterCurrent.toLocaleString()} / ${settings.waterGoal.toLocaleString()} ml`;
    const waterPercent = Math.min(100, (waterCurrent / settings.waterGoal) * 100);
    document.getElementById('water-bar-fill').style.width = `${waterPercent}%`;

    // Update Exercise Mini List
    renderExerciseList(currentLog.exercise || []);
}

function renderMacroItem(type, current, target, calPerGram) {
    const roundedCurrent = Math.round(current * 10) / 10;
    document.getElementById(`${type}-current`).textContent = roundedCurrent;
    document.getElementById(`${type}-target`).textContent = target;

    const percent = Math.min(100, Math.round((current / target) * 100));
    document.getElementById(`${type}-bar-fill`).style.width = `${percent}%`;
    document.getElementById(`${type}-percent`).textContent = `${percent}%`;

    const calFromMacro = Math.round(current * calPerGram);
    document.getElementById(`${type}-cal`).textContent = `${calFromMacro} kcal`;
}

function renderMealCard(mealType, items, subtotalCal) {
    const listContainer = document.getElementById(`${mealType}-items`);
    const subText = document.getElementById(`${mealType}-macros-sub`);
    
    subText.textContent = `${subtotalCal.toLocaleString()} kcal`;

    if (items.length === 0) {
        listContainer.innerHTML = `<div class="empty-meal-state">No foods logged yet</div>`;
        return;
    }

    listContainer.innerHTML = items.map((item, idx) => `
        <div class="food-item-row">
            <div class="food-item-main">
                <span class="food-item-name">${escapeHtml(item.name)}</span>
                <div class="food-item-sub">
                    <span>${item.serving ? escapeHtml(item.serving) : '1 serving'}</span>
                    <span class="macro-pill pill-p">P: ${item.protein || 0}g</span>
                    <span class="macro-pill pill-c">C: ${item.carbs || 0}g</span>
                    <span class="macro-pill pill-f">F: ${item.fat || 0}g</span>
                </div>
            </div>
            <div class="food-item-right">
                <span class="food-item-calories">${item.calories} <small style="font-size:10px; color:#94a3b8">kcal</small></span>
                <div class="food-item-actions">
                    <button class="action-icon-btn delete-food-btn" data-meal="${mealType}" data-index="${idx}" title="Delete Item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderExerciseList(exercises) {
    const container = document.getElementById('exercise-list-container');
    const summaryText = document.getElementById('exercise-summary-text');

    summaryText.textContent = `${exercises.length} logged`;

    if (exercises.length === 0) {
        container.innerHTML = `<div style="font-size:12px; color:#64748b; text-align:center; padding:10px 0;">No workouts logged today</div>`;
        return;
    }

    container.innerHTML = exercises.map((ex, idx) => `
        <div class="exercise-item-pill">
            <span class="exercise-item-name">${escapeHtml(ex.name)}</span>
            <div>
                <span class="exercise-item-val">-${ex.calories} kcal</span>
                <button class="delete-exercise-btn" data-index="${idx}">&times;</button>
            </div>
        </div>
    `).join('');
}

// Helper: Escape HTML string
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, match => {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return map[match];
    });
}

// ==================== MODAL HELPERS ====================
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Date Navigator Events
    document.getElementById('prev-date-btn').addEventListener('click', () => changeDateByDays(-1));
    document.getElementById('next-date-btn').addEventListener('click', () => changeDateByDays(1));
    document.getElementById('today-btn').addEventListener('click', () => {
        currentDate = getTodayDateString();
        updateDateDisplay();
        renderUI();
    });

    document.getElementById('date-picker').addEventListener('change', (e) => {
        if (e.target.value) {
            currentDate = e.target.value;
            updateDateDisplay();
            renderUI();
        }
    });

    // Water Actions
    document.querySelectorAll('.water-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = Number(e.currentTarget.dataset.amount) || 0;
            const log = getLogForDate(currentDate);
            log.water = (log.water || 0) + amount;
            saveLogs();
            renderUI();
        });
    });

    document.getElementById('reset-water-btn').addEventListener('click', () => {
        const log = getLogForDate(currentDate);
        log.water = 0;
        saveLogs();
        renderUI();
    });

    // Delete Food Event Delegation
    document.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.delete-food-btn');
        if (delBtn) {
            const meal = delBtn.dataset.meal;
            const index = Number(delBtn.dataset.index);
            const log = getLogForDate(currentDate);
            if (log.meals[meal]) {
                log.meals[meal].splice(index, 1);
                saveLogs();
                renderUI();
            }
            return;
        }

        const delExBtn = e.target.closest('.delete-exercise-btn');
        if (delExBtn) {
            const index = Number(delExBtn.dataset.index);
            const log = getLogForDate(currentDate);
            if (log.exercise) {
                log.exercise.splice(index, 1);
                saveLogs();
                renderUI();
            }
            return;
        }
    });

    // Add Food Modal Open Buttons
    document.querySelectorAll('.add-food-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedMealCategory = e.currentTarget.dataset.meal;
            document.getElementById('food-meal-type').value = selectedMealCategory;
            document.getElementById('food-modal-title').textContent = `Log Food to ${capitalize(selectedMealCategory)}`;
            renderPresetsGrid('');
            renderSavedFoodsGrid();
            openModal('food-modal');
        });
    });

    document.getElementById('close-food-modal').addEventListener('click', () => closeModal('food-modal'));
    document.getElementById('cancel-food-btn').addEventListener('click', () => closeModal('food-modal'));

    // Modal Tabs Logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            e.currentTarget.classList.add('active');
            const tabId = e.currentTarget.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Presets Search Filter
    document.getElementById('preset-search-input').addEventListener('input', (e) => {
        renderPresetsGrid(e.target.value.toLowerCase().trim());
    });

    // Food Custom Form Submission
    document.getElementById('food-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('food-name').value.trim();
        const serving = document.getElementById('food-serving').value.trim() || '1 serving';
        const mealType = document.getElementById('food-meal-type').value;
        const calories = Number(document.getElementById('food-calories').value) || 0;
        const protein = Number(document.getElementById('food-protein').value) || 0;
        const carbs = Number(document.getElementById('food-carbs').value) || 0;
        const fat = Number(document.getElementById('food-fat').value) || 0;
        const saveToLib = document.getElementById('save-to-library-check').checked;

        const foodItem = { name, serving, calories, protein, carbs, fat };

        const log = getLogForDate(currentDate);
        log.meals[mealType].push(foodItem);
        saveLogs();

        if (saveToLib) {
            // Avoid duplicate by name
            if (!savedFoods.some(f => f.name.toLowerCase() === name.toLowerCase())) {
                savedFoods.push(foodItem);
                saveSavedFoods();
            }
        }

        // Reset form
        document.getElementById('food-form').reset();
        closeModal('food-modal');
        renderUI();
    });

    // Exercise Modal Logic
    document.getElementById('add-exercise-btn').addEventListener('click', () => {
        openModal('exercise-modal');
    });

    document.getElementById('close-exercise-modal').addEventListener('click', () => closeModal('exercise-modal'));
    document.getElementById('cancel-exercise-btn').addEventListener('click', () => closeModal('exercise-modal'));

    document.getElementById('exercise-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('exercise-name').value.trim();
        const calories = Number(document.getElementById('exercise-calories').value) || 0;

        const log = getLogForDate(currentDate);
        log.exercise.push({ name, calories });
        saveLogs();

        document.getElementById('exercise-form').reset();
        closeModal('exercise-modal');
        renderUI();
    });

    // Settings Modal Logic
    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('set-calorie-goal').value = settings.calorieGoal;
        document.getElementById('set-protein-goal').value = settings.proteinGoal;
        document.getElementById('set-carbs-goal').value = settings.carbsGoal;
        document.getElementById('set-fat-goal').value = settings.fatGoal;
        document.getElementById('set-water-goal').value = settings.waterGoal;
        openModal('settings-modal');
    });

    document.getElementById('close-settings-modal').addEventListener('click', () => closeModal('settings-modal'));
    document.getElementById('cancel-settings-btn').addEventListener('click', () => closeModal('settings-modal'));

    document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        settings.calorieGoal = Number(document.getElementById('set-calorie-goal').value) || 2000;
        settings.proteinGoal = Number(document.getElementById('set-protein-goal').value) || 150;
        settings.carbsGoal = Number(document.getElementById('set-carbs-goal').value) || 220;
        settings.fatGoal = Number(document.getElementById('set-fat-goal').value) || 65;
        settings.waterGoal = Number(document.getElementById('set-water-goal').value) || 2000;

        saveSettings();
        closeModal('settings-modal');
        renderUI();
    });

    document.getElementById('clear-all-data-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all calorie logs and settings? This action cannot be undone.')) {
            localStorage.clear();
            settings = { calorieGoal: 2000, proteinGoal: 150, carbsGoal: 220, fatGoal: 65, waterGoal: 2000 };
            logs = {};
            savedFoods = [];
            closeModal('settings-modal');
            renderUI();
        }
    });

    // Analytics Modal Logic
    document.getElementById('analytics-btn').addEventListener('click', () => {
        renderAnalytics();
        openModal('analytics-modal');
    });

    document.getElementById('close-analytics-modal').addEventListener('click', () => closeModal('analytics-modal'));
}

// Capitalize string
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Render Presets Tab Cards
function renderPresetsGrid(filterQuery) {
    const container = document.getElementById('presets-grid-container');
    const filtered = PRESET_FOODS.filter(item => item.name.toLowerCase().includes(filterQuery));

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#64748b; padding:20px;">No preset foods matched "${filterQuery}"</div>`;
        return;
    }

    container.innerHTML = filtered.map((item, idx) => `
        <div class="preset-card" data-preset-idx="${idx}">
            <div class="preset-card-header">
                <span class="preset-name">${escapeHtml(item.name)}</span>
                <span class="preset-cal">${item.calories} kcal</span>
            </div>
            <span class="preset-serving">${escapeHtml(item.serving)}</span>
            <div class="preset-macros">
                <span class="macro-pill pill-p">P: ${item.protein}g</span>
                <span class="macro-pill pill-c">C: ${item.carbs}g</span>
                <span class="macro-pill pill-f">F: ${item.fat}g</span>
            </div>
        </div>
    `).join('');

    // Click handler to log preset immediately
    container.querySelectorAll('.preset-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.dataset.presetIdx);
            const presetItem = filtered[idx];

            if (presetItem) {
                const log = getLogForDate(currentDate);
                log.meals[selectedMealCategory].push({ ...presetItem });
                saveLogs();
                closeModal('food-modal');
                renderUI();
            }
        });
    });
}

// Render Saved Custom Foods Tab Cards
function renderSavedFoodsGrid() {
    const container = document.getElementById('saved-foods-container');

    if (savedFoods.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#64748b; padding:20px;">No saved foods yet. Check "Save to My Saved Foods" when adding a custom item!</div>`;
        return;
    }

    container.innerHTML = savedFoods.map((item, idx) => `
        <div class="preset-card" data-saved-idx="${idx}">
            <div class="preset-card-header">
                <span class="preset-name">${escapeHtml(item.name)}</span>
                <span class="preset-cal">${item.calories} kcal</span>
            </div>
            <span class="preset-serving">${escapeHtml(item.serving)}</span>
            <div class="preset-macros">
                <span class="macro-pill pill-p">P: ${item.protein}g</span>
                <span class="macro-pill pill-c">C: ${item.carbs}g</span>
                <span class="macro-pill pill-f">F: ${item.fat}g</span>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.preset-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.dataset.savedIdx);
            const savedItem = savedFoods[idx];

            if (savedItem) {
                const log = getLogForDate(currentDate);
                log.meals[selectedMealCategory].push({ ...savedItem });
                saveLogs();
                closeModal('food-modal');
                renderUI();
            }
        });
    });
}

// Render 7-Day Analytics
function renderAnalytics() {
    const wrapper = document.getElementById('analytics-bars-wrapper');
    const today = new Date(currentDate + 'T00:00:00');

    let totalIntake7Days = 0;
    let daysMetCount = 0;
    let daysData = [];

    // Past 7 days (including selected currentDate)
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

        const log = logs[dateStr];
        let dayCal = 0;
        if (log && log.meals) {
            ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(m => {
                (log.meals[m] || []).forEach(item => {
                    dayCal += Number(item.calories) || 0;
                });
            });
        }

        totalIntake7Days += dayCal;
        if (dayCal > 0 && dayCal <= settings.calorieGoal) {
            daysMetCount++;
        }

        daysData.push({ dateStr, dayName, calories: dayCal });
    }

    const avg7Days = Math.round(totalIntake7Days / 7);
    document.getElementById('avg-intake-val').textContent = `${avg7Days.toLocaleString()} kcal`;
    document.getElementById('analytics-goal-val').textContent = `${settings.calorieGoal.toLocaleString()} kcal`;
    document.getElementById('days-met-val').textContent = `${daysMetCount} / 7`;

    // Find max calories for scaling bars
    const maxCalInPeriod = Math.max(settings.calorieGoal, ...daysData.map(d => d.calories), 1);

    wrapper.innerHTML = daysData.map(item => {
        const fillHeightPercent = Math.min(100, Math.round((item.calories / maxCalInPeriod) * 100));
        const isOver = item.calories > settings.calorieGoal;

        return `
            <div class="bar-column">
                <span class="bar-val-label">${item.calories ? item.calories : 0}</span>
                <div class="bar-fill-track">
                    <div class="bar-fill-inner ${isOver ? 'over-goal' : ''}" style="height: ${fillHeightPercent}%;"></div>
                </div>
                <span class="bar-day-label">${item.dayName}</span>
            </div>
        `;
    }).join('');
}
