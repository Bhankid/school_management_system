This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Introduction

This README provides an overview of the School Management System codebase, including the main features, installation instructions, and usage examples.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Main Features](#main-features)
3. [Installation](#installation)
4. [Usage Examples](#usage-examples)

## Project Structure

The project structure is as follows:

```
school_management_system/
├── public/
│   ├── favicon.ico
│   └── profile-picture.png
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AccountSettings.tsx
│   │   │   ├── ActiveTab.tsx
│   │   │   ├── AddExpense.tsx
│   │   │   ├── AddStudent.tsx
│   │   │   ├── EventReminder.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── AddTeacher.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Students.tsx
│   │   │   ├── Teachers.tsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   ├── index.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── ...
```

## Main Features

1. Account Settings: Allows users to update their personal information and change their password.
2. Active Tab: Highlights the currently selected tab in the navigation bar.
3. Add Expense: Allows administrators to add new expenses to the system.
4. Add Student: Allows administrators to add new students to the system.
5. Event Reminder: Displays reminders for upcoming events in the header.
6. Header: Displays the main navigation bar and search functionality.
7. Add Teacher: Allows administrators to add new teachers to the system.

## Installation

1. Clone the repository: `git clone https://github.com/Bhankid/school_management_system.git`
2. Navigate to the project directory: `cd school_management_system`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Usage Examples

1. To update your account settings, navigate to the "Account Settings" page and fill out the form.
2. To add a new expense, navigate to the "Expenses" page and click the "Add Expense" button. Fill out the form and submit it.
3. To add a new student, navigate to the "Students" page and click the "Add Student" button. Fill out the form and submit it.
4. To view event reminders, hover over the bell icon in the header.
5. To view the main navigation bar, click on the user profile icon in the header.

## Additional Information

This codebase is built using Next.JS, TypeScript, and Tailwind CSS. It follows best practices for structuring components, managing state, and handling user interactions.

Please note that this README provides a high-level overview of the codebase. For more detailed information, refer to the source code and documentation within the project.

If you encounter any issues or need further assistance, feel free to reach out.
