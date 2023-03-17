# GymNote
This is a full-stack web application built using the MERN stack (MongoDB, Express, React, and Node.js) for tracking workouts. It allows users to create, read, update, and delete workout records. 

## Installation Steps
1. Clone this repository onto your local machine.
  ```
    git clone https://github.com/AElgamal5/MERN-GymNote.git
  ```
2. Navigate to the root directory of the project in your terminal.
  ```
    cd MERN-GymNote
  ```
3. Run npm install to install the dependencies for the server-side code.
  ```
    cd backend
    npm i
  ```
4. Navigate to the client directory in your terminal.
  ```
    cd ../frontend
  ```
5. Run npm install to install the dependencies for the client-side code.
  ```
    npm i
  ```
6. In the "backend" directory, create a .env file to add your MongoDB connection string and port.
  ```
    PRODUCTION= false || true

    PORT=5000 || "any unused port"

    DATABASE_URI= "link to your database"
  ```
7. In the "backend" directory, run npm run dev to start both the server and client concurrently.
  ```
    npm run dev
  ```
8. The application will be available at http://localhost:3000.
