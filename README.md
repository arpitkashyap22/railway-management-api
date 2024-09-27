# Railway Management API

## Overview
The Railway Management API is a RESTful application built with Node.js, Express, and Prisma, designed to facilitate train bookings, seat management, and user registration. It mimics functionalities similar to those of existing railway management systems.

## Assumptions
- You have a basic understanding of Node.js, Express, and RESTful API concepts.
- NPM,NodeJS and MySQL is installed and configured on your local machine.
- You are using a terminal or command prompt that supports bash commands.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [API Endpoints](#api-endpoints)


## Features
- User registration and login
- Admin capabilities to manage trains
- Train availability checks
- Seat booking functionality
- Retrieve booking details

## Technologies
- **Node.js** - JavaScript runtime for building server-side applications
- **Express** - Web framework for Node.js
- **Prisma** - ORM for database management
- **MySQL** - Relational database for storing data
- **JWT** - For secure user authentication


## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/arpitkashyap22/railway-management-api.git
   cd railway-management-api
    ```
2. **Install dependecies**
    ```bash
    npm install
    ```
3. **Set Up MySQL Database**
    - Ensure that MySQL is running on your machine.
    - Create a new database (e.g., railway_management).

4. **Configure Environment Variables**
    - Create a .env file in the root directory and add the following variables
    ```makefile
    DATABASE_URL=mysql://<username>:<password>@localhost:3306/railway_management
    JWT_SECRET=your_jwt_secret  # Use a secure secret key for JWT
    ADMIN_API_KEY="your_admin_api_key"
    PORT=3000
    ```
    Replace <username> and <password> with your MySQL credentials.

5. **Run Prisma Migrations**
    ```bash
    npx prisma migrate dev --name init
    ```

## Running the Application

1. **Start the Server**
   To start the server, use the following command in your terminal:
   ```bash
   node server.js
    ```
    The server will start at http://localhost:3000.


## Testing the Application

Great! Since your server is up and running, the next steps involve testing the API endpoints to ensure they work correctly and implementing any additional features or security measures. Here's what to do next:

### Step 1: Test API Endpoints
You can use Postman, Insomnia, or another API client to interact with your API. Below are the endpoints to test:

1. **Register a User:**
   - **Endpoint:** `POST /api/register`
   - **Body (JSON):**
     ```json
     {
       "username": "john",
       "password": "password123",
       "role": "USER"
     }
     ```

2. **Login a User:**
   - **Endpoint:** `POST /api/login`
   - **Body (JSON):**
     ```json
     {
       "username": "john",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "your_jwt_token"
     }
     ```
   Save the token for the next steps (booking seats and fetching booking details).

3. **Create a Train (Admin only):**
   - **Endpoint:** `POST /api/trains`
   - **Headers:**
     - `x-api-key: your_admin_api_key`
   - **Body (JSON):**
     ```json
     {
       "name": "Express Train",
       "source": "Station A",
       "destination": "Station B",
       "totalSeats": 100
     }
     ```

4. **Get Available Trains:**
   - **Endpoint:** `GET /api/trains?source=Station A&destination=Station B`
   - **Headers:**
     - `Authorization: Bearer your_jwt_token`

5. **Book a Seat:**
   - **Endpoint:** `POST /api/book`
   - **Headers:**
     - `Authorization: Bearer your_jwt_token`
   - **Body (JSON):**
     ```json
     {
       "trainId": 1,
       "seatCount": 2
     }
     ```

6. **Get Booking Details:**
   - **Endpoint:** `GET /api/bookings/:id`
   - **Headers:**
     - `Authorization: Bearer your_jwt_token`



## API Endpoints

### User Endpoints
- **Register**: `POST /api/register`
- **Login**: `POST /api/login`

### Admin Endpoints
- **Add Train**: `POST /api/trains`
- **Update Train**: `PUT /api/trains/:id`

### User Endpoints
- **Get Seat Availability**: `GET /api/trains`
- **Book a Seat**: `POST /api/book`
- **Get Booking Details**: `GET /api/bookings/:id`
