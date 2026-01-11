# Recipes app

An app built with **Next.js**, **Prisma 7** and **SQLite**.

## Overview

This app allows users to browse and manage recipes with simple and clean UI. It’s designed to be easy to run locally.

## Node version requirement

To run this project, you need a recent Node.js version because **Prisma 7 requires Node 20.19+, 22.12+ or 24+**.

Recommended: **Node 24.x (Active LTS)**

If you use nvm, you can switch to the correct version with:

```
nvm install 24
nvm use 24
```

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

### 2. Create .env file

Create a .env file in the project root and add:

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_CDN_BASE_URL="http://localhost:3000/cdn"
```

Prisma and the app both require environment variables to run correctly.

**DATABASE_URL** - used by Prisma to run migrations and generate local dev.db file

**NEXT_PUBLIC_CDN_BASE_URL** - public URL used for serving images in the app

### 3. Initialize the database

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

### 4. Start the development server

```
npm run dev
```
