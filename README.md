Finance Data Processing and Access Control Backend

Objective:
This backend project demonstrates role-based access control, financial record management, and dashboard analytics. It is designed for a finance dashboard system where users interact with financial data based on their role.

Table of Contents
Project Overview
Features
Technology Stack
Setup Instructions
Environment Variables
API Endpoints
Authentication & Access Control
Sample Dashboard Response
Postman Testing Workflow
Project Overview

This project provides a backend for a finance dashboard with:

User Management: Create users, assign roles (ADMIN, ANALYST, VIEWER), and manage user status.
Financial Records: Create, view, and manage financial records (income/expense) linked to users.
Dashboard Analytics: Summary of total users, records, income, and expenses.
Role-Based Access Control: Only authorized users can perform certain actions.
JWT Authentication: Secure access to APIs with JSON Web Tokens.


Features

User Management
Create users (ADMIN only)
View all users (ADMIN only)

Financial Records
Create records (ADMIN only)
View records (ADMIN & ANALYST)

Dashboard
Get summary data (ADMIN & ANALYST)
Total users, total records, total income, total expense

Security
JWT-based authentication
Role-based authorization for endpoints


Technology Stack
Backend: Node.js, Express.js
Database: SQLite with Prisma ORM
Authentication: JWT
Testing: Postman

Setup Instructions
Clone the repository:
git clone <repo_url>

cd finance-backend
Install dependencies:
npm install

Setup environment variables: Create .env file in root folder
PORT=5000
JWT_SECRET=your_secret_key

Initialize Prisma and database:

npx prisma migrate dev --name init

Start the server:
node src/app.js

Server will run on: http://localhost:5000

Environment Variables
Variable	Description
PORT	Port to run the server
JWT_SECRET	Secret key for JWT signing
API Endpoints
User Endpoints

Create User (ADMIN only)
POST /api/user
Headers: Authorization: Bearer <token>

How to get a token  :    npx nodemon tokenANDAdmin.js      then give token
Body (JSON):
{
  "name": "Ayush",
  "email": "ayush@example.com",
  "password": "password123",
  "role": "ANALYST",
  "status": "ACTIVE"
}
Get Users (ADMIN only)
GET /api/users
Headers: Authorization: Bearer <token>
Record Endpoints
Create Record (ADMIN only)
POST /api/records
Headers: Authorization: Bearer <token>
Body (JSON):
{
  "amount": 1000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-04",
  "createdBy": "<user_id>"
}
Get Records (ADMIN & ANALYST)
GET /api/records
Headers: Authorization: Bearer <token>
Dashboard Endpoint
Get Summary (ADMIN & ANALYST)
GET /api/dashboard
Headers: Authorization: Bearer <token>
Response:
{
  "totalUsers": 3,
  "totalRecords": 5,
  "totalIncome": 5000,
  "totalExpense": 0
}
Authentication & Access Control
All endpoints require JWT token in headers:
Authorization: Bearer <token>
Roles determine access:
ADMIN: Full access (users + records + dashboard)
ANALYST: View records + dashboard
VIEWER: View-only (future enhancement)
Sample Dashboard Response
{
  "totalUsers": 3,
  "totalRecords": 5,
  "totalIncome": 5000,
  "totalExpense": 0
}
Postman Testing Workflow
Generate JWT token using the admin.js script.
Copy token to Postman header:
Authorization: Bearer <token>
Test endpoints in order:
Create User
Get Users
Create Record
Get Records
Get Dashboard
Ensure all requests return expected responses according to roles.

Note:
This backend is designed for evaluation purposes. The focus is on clarity, maintainability, and correct role-based access implementation.

If you want, I can also create a one-click ready Postman JSON collection that has all endpoints + pre-configured token header so HR can just import and click Run All.

Do you want me to do that too?