# Recipes app

An app built with **Next.js**, **Prisma 7** and **SQLite**.

## Overview

This app allows users to browse and manage recipes with simple and clean UI. It’s designed to be easy to run locally.

## Tech stack

- Next.js 16 - gives clean separation between server and client logic, perfect for filtering, data fetching and rendering dynamic content
- Prisma 7 - provides a modern, intuitive schema and migrations system, and type‑safe queries
- SQLite - simple, file‑based database ideal for quick local development

**For this project, I used SQLite because it keeps setup easy - no external DB is required.**

## Setup instructions

### 1. Clone the repository

```
git clone https://github.com/mariovida/recipes.git
cd recipes
npm install
```

### 2. Initialize the database

Generate Prisma client:

```
npx prisma generate
```

Run migrations:

```
npx prisma migrate dev
```

Seed the database:

```
npm run db:seed
```

This creates the SQLite file and populates it with sample recipes.

### 3. Start the development server

```
npm run dev
```
