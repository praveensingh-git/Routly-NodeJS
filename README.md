
# 🚀 Routly - A URL Shortener Application

## 📝 Overview
A full-stack URL shortening service built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating.  
Features include **user authentication**, **URL shortening**, **click analytics**, and a **responsive UI**.

## 📚 Table of Contents
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [✨ Features](#-features)
- [⚙️ Setup Instructions](#-setup-instructions)
- [🔗 API Endpoints](#api-endpoints)
- [🗄️ Database Models](#database-models)
- [🔒 Authentication Flow](#authentication-flow)
- [🛡️ Error Handling](#error-handling)
- [🎨 UI Components](#ui-components)

## 🛠️ Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: EJS templates
- **Styling**: Custom CSS with animations
- **Dependencies**:
  - `express`, `mongoose`, `shortid`, `uuid`, `jsonwebtoken`, `dotenv`, `cookie-parser`

## 📁 Project Structure
📂 connection/    # Database connection  
&nbsp;&nbsp;&nbsp;📄 connect.js  
📂 controllers/    # Business logic  
&nbsp;&nbsp;&nbsp;📄 auth.js  
&nbsp;&nbsp;&nbsp;📄 url.js  
&nbsp;&nbsp;&nbsp;📄 user.js  
📂 middleware/    # Authentication middleware  
&nbsp;&nbsp;&nbsp;📄 auth.js  
📂 models/    # MongoDB schemas  
&nbsp;&nbsp;&nbsp;📄 url.js  
&nbsp;&nbsp;&nbsp;📄 user.js  
📂 routes/    # Route definitions  
&nbsp;&nbsp;&nbsp;📄 staticRouter.js  
&nbsp;&nbsp;&nbsp;📄 url.js  
&nbsp;&nbsp;&nbsp;📄 user.js  
📂 views/    # EJS templates  
&nbsp;&nbsp;&nbsp;📄 home.ejs  
&nbsp;&nbsp;&nbsp;📄 login.ejs  
&nbsp;&nbsp;&nbsp;📄 signup.ejs  
📄 index.js    # Main application entry

## ✨ Features

### 🔐 User Authentication
- Signup with name, email, password
- Login with email/password
- JWT-based session management
- Protected routes

### 🔗 URL Management
- Generate short URLs (8-character IDs)
- Track visit history with timestamps
- View click analytics
- User-specific URL listings

### 🎨 UI Features
- Responsive design
- Animated transitions
- Clipboard copy functionality
- Visual feedback for actions

## ⚙️ Setup Instructions

### 📋 Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection string)
- Create `.env` file with:
  ```env
  JWT_SECRET=your_random_secret_key

### 📦 Installation

```
npm install express mongoose shortid uuid jsonwebtoken dotenv cookie-parser ejs
  ```

### ▶️ Run Application
```
node index.js
```
- Server starts on `http://localhost:8000`

 ## 🔗 API Endpoints

| Method | Path              | Description                | Auth Required |
|:------:|:------------------|:--------------------------|:-------------:|
| GET    | `/`                | Homepage with user's URLs | ✅ Yes        |
| GET    | `/login`           | Login page                | ❌ No         |
| GET    | `/signup`          | Signup page               | ❌ No         |
| POST   | `/user/login`      | Authenticate user         | ❌ No         |
| POST   | `/user/signup`     | Create new user           | ❌ No         |
| POST   | `/url`             | Create short URL          | ✅ Yes        |
| GET    | `/url/:shortId`    | Redirect to original URL  | ❌ No         |
| GET    | `/analytics/:shortId` | Get URL analytics       | ✅ Yes        |


## 🔒Authentication Flow
### 🔑Login Process:

- User submits email/password

- Server verifies credentials

- JWT token generated and set as cookie (uid)

- Token valid for 1 day

### 🛡️Protected Routes:

- Middleware checks for valid JWT cookie

- Invalid/expired tokens redirect to login

- Valid tokens attach user to req.user

### 🧩Middleware:

- `restrictToLoggedinUserOnly`: Strict auth check

- `checkAuth`: Optional auth for public views

## Error Handling

- **Authentication Errors**: Clear cookie and redirect.
- **Database Errors**: Log to console with timestamps.
- **Client Errors**: User-friendly messages in UI.
- **JWT Errors**: Detailed verification logging.
  
## 🎨UI Components

### 🏠Home Page (`home.ejs`)
- URL shortening form
- Success notifications
- User's URL table with:
  - Short links
  - Original URLs
  - Click counts
  - Action buttons (copy, edit, delete)

### 🔐Login Page (`login.ejs`)
- Animated background
- Form validation
- Error message display
- Responsive design

### 📝Signup Page (`signup.ejs`)
- Interactive form fields
- Password complexity hint
- Login link
- Zoom animation effect


# 🚀 Thank you for checking out Routly!
Built with 💻➕🍵 by the [Praveen](https://github.com/praveensingh-git)
