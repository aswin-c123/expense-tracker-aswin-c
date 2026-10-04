# Expense Tracker

A simple, responsive expense tracker built with plain **HTML, CSS and JavaScript**. No frameworks or build tools. Data is saved in the browser's Local Storage, so it stays after a page refresh.

Live demo: https://expense-tracker-aswin-c.vercel.app/

## How to run

1. Download or clone this repository:
   ```
   git clone https://github.com/aswin-c123/expense-tracker-aswin-c.git
   ```
2. Open the `expense-tracker-aswin-c` folder.
3. Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox or Safari).

No installation or server is needed.

> An internet connection is needed for the icons (Font Awesome), the Lato font and the chart library (Chart.js), which load from CDNs. Without internet, the app still works, but icons, the font and the chart will not show.

## Features

**Core**
- Add income or expense transactions with amount, category, date and description
- Edit and delete transactions
- Total income, total expenses and current balance
- Filter by type (income / expense) and by category; the summary cards follow the filters
- Data saved in Local Storage
- Responsive layout for desktop and mobile

**Bonus**
- Monthly summary showing income, expenses and balance for each month
- Category-wise expense chart (doughnut) with a text breakdown of amounts and percentages
- Form validation with a specific error message under each field

## Project structure

```
expense-tracker-aswin-c/
├── index.html   # page structure
├── style.css    # styling and responsive layout
├── script.js    # app logic, Local Storage, validation, chart
└── README.md
```

## Notes

- Amounts are shown in Indian rupees (₹) and dates in the Indian format.
- The monthly summary always uses all transactions. The summary cards, list and chart use the active filters.
- Descriptions are limited to 60 characters, and amounts allow up to 2 decimal places.

## Built with

- HTML5, CSS3 (Grid, Flexbox, CSS variables, media queries)
- Vanilla JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) for the chart
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) (Lato)
