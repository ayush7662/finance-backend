# 💼 Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a backend system for a finance dashboard that demonstrates **role-based access control (RBAC)**, **secure authentication**, and **financial data management**.

It enables organizations to manage users and financial records efficiently while ensuring that access to data is restricted based on user roles.

---

## 🚀 Features

### 👤 User Management

* Create users (**ADMIN only**)
* View all users (**ADMIN only**)
* Assign roles: `ADMIN`, `ANALYST`, `VIEWER`
* Manage user status (ACTIVE/INACTIVE)

### 💰 Financial Records

* Create financial records (**ADMIN only**)
* View records (**ADMIN & ANALYST**)
* Supports:

  * Income tracking
  * Expense tracking
  * Categorization and date-based records

### 📊 Dashboard Analytics

* Get aggregated financial insights:

  * Total users
  * Total records
  * Total income
  * Total expenses
* Accessible by **ADMIN & ANALYST**

### 🔐 Security

* JWT-based authentication
* Role-based authorization
* Protected API endpoints

---

## 🛠️ Technology Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Backend  | Node.js, Express.js   |
| Database | SQLite                |
| ORM      | Prisma                |
| Auth     | JSON Web Tokens (JWT) |
| Testing  | Postman               |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repo_url>
cd finance-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

### 4️⃣ Initialize Database

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start Server

```bash
node src/app.js
```

Server will run at:

```
http://localhost:5000
```

---

## 🔑 Authentication & Access Control

All API endpoints require a JWT token:

```
Authorization: Bearer <token>
```

### 🎭 Roles & Permissions

| Role    | Permissions                    |
| ------- | ------------------------------ |
| ADMIN   | Full access                    |
| ANALYST | View records & dashboard       |
| VIEWER  | Read-only (future enhancement) |

---

## 📡 API Endpoints

### 👤 User Endpoints

#### ➤ Create User (ADMIN)

```
POST /api/user
```

**Body:**

```json
{
  "name": "Ayush",
  "email": "ayush@example.com",
  "password": "password123",
  "role": "ANALYST",
  "status": "ACTIVE"
}
```

---

#### ➤ Get All Users (ADMIN)

```
GET /api/users
```

---

### 💰 Record Endpoints

#### ➤ Create Record (ADMIN)

```
POST /api/records
```

**Body:**

```json
{
  "amount": 1000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-04",
  "createdBy": "<user_id>"
}
```

---

#### ➤ Get Records (ADMIN, ANALYST)

```
GET /api/records
```

---

### 📊 Dashboard Endpoint

#### ➤ Get Summary (ADMIN, ANALYST)

```
GET /api/dashboard
```

**Sample Response:**

```json
{
  "totalUsers": 3,
  "totalRecords": 5,
  "totalIncome": 5000,
  "totalExpense": 0
}
```

---

## 🧪 Postman Testing Workflow

1. Generate JWT token:

```bash
npx nodemon tokenANDAdmin.js
```

2. Add token to headers:

```
Authorization: Bearer <token>
```

3. Test APIs in sequence:

* Create User
* Get Users
* Create Record
* Get Records
* Get Dashboard

---

## 📌 Notes

* This project is designed for **evaluation and demonstration purposes**
* Focus areas:

  * Clean architecture
  * Secure access control
  * Maintainable code structure

---

## ✨ Future Enhancements

* VIEWER role implementation
* Pagination & filtering for records
* Advanced analytics (monthly trends, charts)
* Refresh tokens for authentication
* Docker deployment support

---

## 🤝 Contribution

Feel free to fork the repository and submit pull requests for improvements.

---

## 📄 License

This project is open-source and available under the MIT License.

---
