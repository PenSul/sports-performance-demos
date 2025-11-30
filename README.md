# Sports Performance Analytics System

A comprehensive React-based demo application showcasing the UI/UX implementation for the Sports Performance Analytics System, developed by Group 30 for COMP3500SEF.

---

## Table of Contents

- [Overview](#overview)
- [Demo Descriptions](#demo-descriptions)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Demo Usage Guide](#demo-usage-guide)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)

---

## Overview

This repository contains 5 interactive React demo components that demonstrate the core functionality of the Sports Performance Analytics System. Each demo corresponds to a prioritized use case identified during our software engineering process.

---

## Demo Descriptions

| Demo | Use Case | Description |
|------|----------|-------------|
| **Demo 1** | UC15 - Authenticate User | User login interface with role-based authentication for Coaches, Athletes, and Performance Analysts |
| **Demo 2** | UC5 - View Performance Dashboard | Comprehensive dashboard displaying athlete metrics, performance trends, and team statistics |
| **Demo 3** | UC3 - Manage Athlete Profiles | CRUD interface for managing athlete information, physical stats, and performance data |
| **Demo 4** | UC6 - Analyze Performance Trends | Data visualization tools for tracking and analyzing athlete performance over time |
| **Demo 5** | UC13 - Generate Performance Report | Report generation interface with export and sharing capabilities |

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (version 8.0 or higher) - Comes bundled with Node.js

To verify your installation, run:

```bash
node --version
npm --version
```

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PenSul/sports-performance-demos.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd sports-performance-demos
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

---

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Demo Usage Guide

Once the application is running, you'll see a navigation menu. Click on any demo to view it.

### Demo 1: Authenticate User

**Test Credentials:**

| Role | Email | Password |
|------|-------|----------|
| Coach | coach@sports.com | password123 |
| Athlete | athlete@sports.com | password123 |
| Analyst | analyst@sports.com | password123 |

**Features:**
- Email and password login form
- Toggle password visibility
- Role-based welcome message upon successful login
- Sign out functionality

---

### Demo 2: Performance Dashboard

**Features:**
- Summary cards displaying key metrics
- Team and time period filters
- Interactive performance line chart
- Training distribution pie chart
- Recent activities feed
- Top performers leaderboard

---

### Demo 3: Manage Athlete Profiles

**Features:**
- Search athletes by name or email
- Filter by sport and status
- View detailed athlete profiles
- Add, edit, and delete athletes
- View physical stats and performance scores

---

### Demo 4: Analyze Performance Trends

**Features:**
- Athlete, metric, and time period selection
- Performance insights cards
- Interactive area chart for trends
- Radar chart comparing performance periods
- Weekly training load visualization
- Trend analysis summary

---

### Demo 5: Generate Performance Report

**Features:**
- Configurable report parameters
- Comprehensive report generation with:
  - Athlete profile header
  - Key statistics cards
  - Performance progression chart
  - Metrics comparison chart
  - Achievements and recommendations
- Export, print, and share options (UI demonstration)

---

## Testing

This project includes a comprehensive testing suite covering Unit Tests, Component Tests, System Tests, and User Acceptance Tests (UAT).

### Quick Start

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (development)
npm run test:watch
```

### Testing Documentation

For detailed information about our testing strategy, including how to run specific test suites and how our tests reflect the implementation approach described in our project report, please refer to the **[Testing Documentation](src/tests/README.md)**.

The testing documentation covers:
- Four-level testing strategy (Unit, Component, System, UAT)
- How testing validates our mock data implementation
- Test coverage targets and reporting
- Mapping tests to use case scenarios
- Writing new tests and naming conventions

---

## Project Structure

```
sports-performance-analytics/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Demo1_AuthenticateUser.jsx
│   │   ├── Demo2_PerformanceDashboard.jsx
│   │   ├── Demo3_ManageAthleteProfiles.jsx
│   │   ├── Demo4_AnalyzePerformanceTrends.jsx
│   │   └── Demo5_GeneratePerformanceReport.jsx
│   ├── tests/
│   │   ├── README.md              # Testing documentation
│   │   ├── setup.js               # Test environment configuration
│   │   ├── unit/                  # Unit tests
│   │   ├── component/             # Component tests
│   │   ├── system/                # System integration tests
│   │   └── uat/                   # User acceptance tests
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vitest.config.js
├── vite.config.js
└── README.md
```

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Utility-first CSS Framework |
| Recharts | Data Visualization & Charts |
| Lucide React | Icon Library |
| @headlessui/react | Accessible UI Components |
| Vitest | Test Runner |
| React Testing Library | Component Testing |

---

## Troubleshooting

### `npm install` fails

Clear the npm cache and retry:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Styles not applying

Ensure the development server is running and try a hard refresh (`Ctrl + Shift + R` or `Cmd + Shift + R`).

### Charts not rendering

Verify that recharts is installed:

```bash
npm list recharts
```

If not listed, reinstall dependencies:

```bash
npm install
```

### Port already in use

If port 5173 is occupied, Vite will automatically try the next available port. Check the terminal output for the correct URL.

### Tests failing

If tests fail unexpectedly, try reinstalling dependencies:

```bash
rm -rf node_modules
npm install
npm test
```

For more troubleshooting tips related to testing, see the [Testing Documentation](src/tests/README.md#troubleshooting).
