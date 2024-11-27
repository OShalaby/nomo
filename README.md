
# Mobile Automation QA - Login Functionality

This repository contains an automated test suite for the login functionality of a mobile application. The tests are written in **Javascript** using **WebdriverIO**, **Appium**, and follow the **Page Object Model (POM)** and **Factory** design patterns with **Cucumber BDD**.

---

## Features
- Automates login functionality for both **iOS** and **Android** native applications.
- Covers positive and negative test cases.
- Generates test reports.
- Includes reusable and well-organized Page Object classes.
- Test data is stored separately for flexibility.

---

## Requirements
1. Node.js (>=16.x)
2. Appium (install via `npm install -g appium`)
3. Xcode (for iOS tests) or Android Studio (for Android tests)
4. WebdriverIO CLI (`npm install -g @wdio/cli`)
5. Emulator/simulator configured for testing

---

## Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:OShalaby/nomo.git
   cd nomo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Setup
1. **App Files**:
   - Download the `.apk` and `.app/.ipa` files from [here](https://github.com/saucelabs/my-demo-app-rn/releases/).
   - Place the files in the `apps/` directory.

2. **Device Configuration**:
   - Update the `.env` file with your emulator/simulator or physical device capabilities.

---

## Run Tests
1. **Android**:
   ```bash
   npm run test:android
   ```

2. **iOS**:
   ```bash
   npm run test:ios
   ```

3. **Generate Report**:
   ```bash
   npm run report
   ```

---

## Reports
- Test results are stored in the `reports/allure-results/` directory.
- Generate and open the report:
   ```bash
   npm run report
   ```

---

## Test Data
The following test credentials are used:

| Scenario         | Username           | Password  |
|------------------|--------------------|-----------|
| Locked User      | alice@example.com | 10203040  |
| Invalid User     | 1@2.com           | f-o-o     |
| No User Details  | (empty)           | (empty)   |
| No Password      | bob@example.com   | (empty)   |
| Standard User    | bob@example.com   | 10203040  |
