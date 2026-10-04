/* =========================================================
   Expense Tracker - script.js
   Step 3: add transactions, save to Local Storage, show list
   ========================================================= */

/* ---------- 1. Constants ---------- */
const STORAGE_KEY = "expense-tracker-transactions";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Gift", "Other Income"],
  expense: ["Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Other"]
};

/* ---------- 2. Grab the HTML elements we need ---------- */
const form = document.getElementById("transaction-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const list = document.getElementById("transaction-list");
const emptyState = document.getElementById("empty-state");
const message = document.getElementById("message");

const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");

/* ---------- 3. App state (the single source of truth) ---------- */
let transactions = loadTransactions();

/* ---------- 4. Local Storage ---------- */
function loadTransactions() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // Corrupted or unavailable storage: start with an empty list
    return [];
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Could not save to Local Storage:", error);
  }
}

/* ---------- 5. Helper functions ---------- */
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount);
}

function formatDate(dateString) {
  // Adding T00:00:00 stops the date shifting by a day because of time zones
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function todayString() {
  // Today's date in the user's local time, formatted as YYYY-MM-DD
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function escapeHTML(text) {
  // Stops user text from being treated as HTML (protects against injection)
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = "";
  }, 2500);
}

/* ---------- 6. Category dropdown depends on the chosen type ---------- */
function populateCategories(type) {
  categoryInput.innerHTML = '<option value="">Select category</option>';

  const options = CATEGORIES[type] || [];
  options.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    categoryInput.appendChild(option);
  });
}

typeInput.addEventListener("change", () => {
  populateCategories(typeInput.value);
});

/* ---------- 7. Add a transaction ---------- */
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const transaction = {
    id: Date.now(),
    type: typeInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value,
    description: descriptionInput.value.trim()
  };

  // Temporary check. Step 6 replaces this with full validation.
  if (
    !transaction.type ||
    !(transaction.amount > 0) ||
    !transaction.category ||
    !transaction.date ||
    !transaction.description
  ) {
    showMessage("Please fill in all fields.");
    return;
  }

  transactions.push(transaction);
  saveTransactions();
  render();

  form.reset();
  populateCategories("");
  dateInput.value = todayString();
  showMessage("Transaction added.");
});

/* ---------- 8. Rendering ---------- */
function renderSummary() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  totalIncomeEl.textContent = formatCurrency(totalIncome);
  totalExpenseEl.textContent = formatCurrency(totalExpense);
  balanceEl.textContent = formatCurrency(totalIncome - totalExpense);
}

function renderList() {
  // Newest date first; if dates match, newest added first
  const sorted = [...transactions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );

  list.innerHTML = sorted
    .map(
      (t) => `
      <li class="transaction ${t.type}" data-id="${t.id}">
        <div>
          <div class="t-desc">${escapeHTML(t.description)}</div>
          <div class="t-meta">
            <i class="fa-solid fa-calendar"></i> ${formatDate(t.date)} · ${escapeHTML(t.category)}
          </div>
        </div>
        <div class="t-amount">${t.type === "income" ? "+" : "-"}${formatCurrency(t.amount)}</div>
        <div class="t-actions">
          <button type="button" class="btn-edit"><i class="fa-solid fa-pen"></i> Edit</button>
          <button type="button" class="btn-delete"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
      </li>`
    )
    .join("");

  emptyState.hidden = transactions.length > 0;
}

function render() {
  renderSummary();
  renderList();
}

/* ---------- 9. Start the app ---------- */
dateInput.value = todayString();
populateCategories("");
render();
