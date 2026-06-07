# Sample Management System - MERN Stack

A comprehensive web application for managing company samples built with the MERN (MongoDB, Express, React, Node.js) stack. Features a clean white background UI with authentication, user management, and sample tracking capabilities.

## Features

- **User Authentication**: Secure login and registration system
- **Sample Management**: Create, read, update, and delete samples
- **Search & Filter**: Search samples by ID or name, filter by status
- **User Management**: Admin panel for managing users and roles
- **Dashboard**: Overview of sample statistics and recent activity
- **Responsive Design**: Clean white-themed UI that works on all devices
- **Role-Based Access**: Admin, Manager, and Staff roles

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with white background theme

## Project Structure

```
sample-management-mern/
├── backend/
│   ├── models/
│   │   ├── Sample.js
│   │   └── User.js
│   ├── routes/
│   │   ├── samples.js
│   │   └── users.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SampleList.js
│   │   │   ├── SampleForm.js
│   │   │   ├── SampleDetail.js
│   │   │   ├── UserList.js
│   │   │   └── *.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```
MONGODB_URI=mongodb://localhost:27017/sample-management
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Database Setup

Make sure MongoDB is running on your system. You can:
- Install MongoDB locally: https://docs.mongodb.com/manual/installation/
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View sample statistics and recent activity
4. **Manage Samples**: 
   - View all samples with search and filter
   - Add new samples
   - Edit existing samples
   - View detailed sample information
   - Delete samples
5. **Admin Panel**: Access user management (admin only)

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Samples
- `GET /api/samples` - Get all samples
- `GET /api/samples/:id` - Get sample by ID
- `POST /api/samples` - Create new sample
- `PUT /api/samples/:id` - Update sample
- `DELETE /api/samples/:id` - Delete sample
- `GET /api/samples/search/query?q=<query>` - Search samples

## Color Scheme

The application uses a clean white background theme with:
- **Primary**: #0066cc (Blue)
- **Secondary**: #e0e0e0 (Light Gray)
- **Background**: #ffffff (White)
- **Text**: #333333 (Dark Gray)
- **Success**: #28a745 (Green)
- **Danger**: #dc3545 (Red)
- **Warning**: #ffc107 (Yellow)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the GitHub repository.