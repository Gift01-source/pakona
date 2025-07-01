# Node.js Backend Project

## Overview
This project is a Node.js backend application that provides authentication functionality for a React frontend. It includes user login and registration features, connecting to a database to manage user data.

## Project Structure
```
node-backend
├── src
│   ├── controllers
│   │   └── authController.js
│   ├── routes
│   │   └── authRoutes.js
│   ├── models
│   │   └── userModel.js
│   ├── config
│   │   └── dbConfig.js
│   └── app.js
├── package.json
├── .env
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd node-backend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your database connection string and any other necessary environment variables:
   ```
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the Application**
   Start the server using:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes
- **POST /api/login**
  - Description: Authenticates a user and returns a JWT token.
  - Request Body: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **POST /api/register**
  - Description: Registers a new user.
  - Request Body: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

## Usage Examples
You can use tools like Postman or cURL to test the API endpoints. Make sure to include the necessary headers, such as `Content-Type: application/json`.

## License
This project is licensed under the MIT License.