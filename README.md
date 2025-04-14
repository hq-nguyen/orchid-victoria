# Orchid Management Frontend

## Overview

This is the frontend project for Orchid Management, a demo application that showcases orchid categories, individual orchid details, and allows feedback from users. It is built using ReactJS + Vite with TailwindCSS and Firebase for storage and authentication.

## Features

- 🌸 Browse orchid categories
- 🌼 View orchid details with images, video, and description
- 💬 Submit feedback and ratings for orchids
- 🔐 Google Authentication using Firebase
- 📦 Firebase Storage for image assets

## Tech Stack

- ReactJS with Vite
- TailwindCSS for styling
- React Router for navigation
- Firebase (Auth + Storage)
- Axios for API requests
- json-server or MockAPI for mock backend

## Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm or yarn

### 1. Clone the Project

```bash
git clone https://github.com/your-username/orchid-management-client.git
cd orchid-management-client
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
# Backend API (you can switch between json-server or MockAPI)
VITE_BASE_URL=https://your-json-server-or-mockapi-endpoint.com

# Firebase key
VITE_FIREBASE_STORAGE_API_KEY=your-api-key
VITE_FIREBASE_STORAGE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_STORAGE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_STORAGE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_STORAGE_APP_ID=your-app-id
VITE_FIREBASE_STORAGE_MEASUREMENT_ID=your-measurement-id
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:51xx.

### Optional: Setup json-server for Local Mock API

You can run json-server locally to simulate a backend.

Steps:

1. Create a `db.json` file in the root directory with your mock data.

2. Install json-server globally (or as a dev dependency):
   ```bash
   npm install -g json-server
   # or
   npm install --save-dev json-server
   ```

3. Run the server:
   ```bash
   json-server --watch db.json --port 3001
   ```

4. Update your `.env`:
   ```
   VITE_BASE_URL=http://localhost:3001
   ```

## Questions

For help or support, reach out to: 📧 nguyenhaiquan.data@gmail.com
