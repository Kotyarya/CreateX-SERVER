# CreateX IT Courses Shop - Backend

This is the backend part of the CreateX IT Courses Shop project, developed in Node.js. It serves as the server-side application handling the business logic and interactions with the PostgreSQL database. Below are the main technologies and libraries used:

- Node.js: Runtime environment for running JavaScript on the server.
  
- Express: Web framework for Node.js, used for building the RESTful API endpoints.
  
- Sequelize: Promise-based ORM (Object-Relational Mapping) for PostgreSQL, simplifying database interactions.
  
- PostgreSQL: Relational database management system used for storing application data securely.
  
- jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT) for authentication.
  
- bcrypt: Library for hashing passwords to ensure secure storage.
  
## Features

1. ### User Authentication:

- Users can sign up and create accounts.

- Passwords are securely hashed using bcrypt before storing in the database.

- JWT (JSON Web Tokens) are used for user authentication and authorization.

2. ### Courses and Events Management:

- CRUD (Create, Read, Update, Delete) operations for managing IT courses and events.

- Courses and events data is stored in the PostgreSQL database.

- API endpoints for handling course and event data.

3. ### User Favorites:

- Users can mark courses and events as favorites.

- Endpoint to manage and retrieve user's favorite courses and events.

4. ### Search and Filters:

- Search functionality for courses and events based on keywords.

- Filters for courses and events based on categories, dates, etc.

5. ### Security:

- Implementation of middleware for validating JWT tokens on protected routes.

- Protection against common security vulnerabilities like SQL injection and CSRF attacks.

6. ### Error Handling:

Centralized error handling middleware for managing and responding to errors.


## Installation

Clone the repository:
   
   ```sh
   git clone https://github.com/Kotyarya/CreateX-SERVER
