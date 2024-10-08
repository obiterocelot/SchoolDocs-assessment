# Todo App Backend

This is the backend for a simple Todo application built with Node.js, Express, and an in-memory data store. The backend exposes a RESTful API for managing todos.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, read, update, and delete todos.
- In-memory storage for todos.
- Basic input validation and error handling.

## Technologies Used
- Node.js - v20.12.1
- Express
- CORS
- Short Unique ID (for generating unique IDs)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/todo-app-backend.git
   cd todo-app-backend
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the server:**
   You can start the server in development mode using:
   ```bash
   npm run dev
   ```
   or in production mode using:
   ```bash
   npm start
   ```

2. **Access the API:**
   The API will be available at `http://localhost:5000/api/todos`.

## API Endpoints

- **Create a Todo**
  - **Method**: `POST`
  - **Endpoint**: `/api/todos`
  - **Body**: 
    ```json
    {
      "title": "Your todo title"
    }
    ```

- **Get All Todos**
  - **Method**: `GET`
  - **Endpoint**: `/api/todos`

- **Get a Single Todo**
  - **Method**: `GET`
  - **Endpoint**: `/api/todos/:id`

- **Update a Todo**
  - **Method**: `PUT`
  - **Endpoint**: `/api/todos/:id`
  - **Body**: 
    ```json
    {
      "title": "Updated title",
      "completed": true
    }
    ```

- **Delete a Todo**
  - **Method**: `DELETE`
  - **Endpoint**: `/api/todos/:id`

## Error Handling
The API provides appropriate HTTP status codes and error messages for various scenarios, such as:
- 400 Bad Request: When the input is invalid.
- 404 Not Found: When a todo is not found.
- 500 Internal Server Error: For unexpected errors.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.