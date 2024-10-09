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

## Main Technologies Used

- Node.js - v20.12.1
- Express
- UUID (for generating unique IDs)
- TypeScript

## Installation


1. **Ensure you have clone the repository** on your machine.

2. **Navigate to the codebase**:
   ```bash
   cd backend
   ```

3. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the server:**
   You can start the server in development mode using:

   ```bash
   npm start
   ```

2. **Access the API:**
   The API will be available at `http://localhost:{port}/api/todos`.

## API Endpoints

| Method | Endpoint         | Description             | Request Body                                      | Response                           |
| ------ | ---------------- | ----------------------- | ------------------------------------------------- | ---------------------------------- |
| POST   | `/api/todos`     | Create a new todo       | `{ "title": "Your todo title" }`                  | `201 Created` with new todo object |
| GET    | `/api/todos`     | Get all todos           | N/A                                               | `200 OK` with array of todos       |
| GET    | `/api/todos/:id` | Get a single todo by ID | N/A                                               | `200 OK` with todo object          |
| PUT    | `/api/todos/:id` | Update a todo by ID     | `{ "title": "Updated title", "completed": true }` | `200 OK` with updated todo object  |
| DELETE | `/api/todos/:id` | Delete a todo by ID     | N/A                                               | `200 OK` with success message      |

## Error Handling

The API provides appropriate HTTP status codes and error messages for various scenarios, such as:

- 400 Bad Request: When the input is invalid.
- 404 Not Found: When a todo is not found.
- 500 Internal Server Error: For unexpected errors.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
