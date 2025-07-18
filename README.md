# Task for Pabitra Ghara

## Task Description

Your task is to complete the following:

- Develop a full-stack web application for a Book Management System, allowing users to add, edit, delete, and view book details. Use React for the frontend, NestJS and Express for the backend, and manage data with PostgreSQL. Ensure to implement user authentication and RESTful APIs for interaction.

## Submission Instructions

1. Clone this repository.
2. Complete the task as described.
3. Submit a push request when done.

Good luck!

A full-stack web application for managing books with user authentication, built with React, NestJS, and PostgreSQL.

## Features

- 🔐 User authentication (login/register)
- 📚 Add, edit, delete, and view books
- 🔍 Search functionality
- 📖 Book categorization by genre and author
- 👤 User-specific book management
- 📱 Responsive design with Tailwind CSS
- 📖 RESTful API with Swagger documentation

## Technology Stack

### Frontend

- React 18
- Tailwind CSS
- React Hook Form
- Axios
- React Router DOM

### Backend

- NestJS
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Swagger API Documentation
- bcryptjs for password hashing

### Database

- PostgreSQL

## Prerequisites

- Node.js
- yarn
- PostgreSQL

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd book-management-system
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Database Setup

Create a PostgreSQL database named `book_management`:

```sql
CREATE DATABASE book_management;
```

### 4. Environment Configuration

Update the database configuration in `backend/.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=book_management
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRES_IN=7d
PORT=3001
```

### 5. Run the application

```bash
yarn run start
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:3001) servers.

## API Documentation

Once the backend is running, you can access the Swagger API documentation at:
http://localhost:3001/api/docs

## Usage

### Authentication

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with username/email and password

### Book Management

1. **View Books**: See all books in the system
2. **My Books**: View only your added books
3. **Add Book**: Create a new book entry
4. **Edit Book**: Modify your book details
5. **Delete Book**: Remove your books
6. **Search**: Find books by title, author, or genre

### Features

- **User Roles**: Regular users and admins
- **Book Status**: Available, Borrowed, Reserved
- **Search**: Full-text search across title, author, and genre
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

### Books

- `GET /books` - Get all books
- `GET /books?my=true` - Get current user's books
- `POST /books` - Create new book
- `GET /books/:id` - Get book by ID
- `PATCH /books/:id` - Update book
- `DELETE /books/:id` - Delete book
- `GET /books/search?q=query` - Search books

### Users

- `GET /users` - Get all users (authenticated)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

This will start:

- PostgreSQL database on port 5432
- Backend API on port 3001
- Frontend app on port 3000

## Development

### Backend Development

```bash
cd backend
yarn run start:dev
```

### Frontend Development

```bash
cd frontend
yarn run start
```

### Database Migration

The application uses Sequelize with `synchronize: true` for development, which automatically creates tables based on models.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

---

## Task Completion

✅ **Completed Features:**

- Full-stack web application for Book Management System
- React frontend with Tailwind CSS
- NestJS backend with Express
- PostgreSQL database with Sequelize ORM
- User authentication with JWT
- RESTful APIs with Swagger documentation
- CRUD operations for books
- Search functionality
- User-specific book management
- Responsive design
