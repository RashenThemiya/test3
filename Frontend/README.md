Step 1: Setup Backend Environment

    Navigate to the backend folder:

cd backend

    Install dependencies:

npm install

    Create a .env file inside the backend folder with the following content (replace placeholders):

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cleaning_service_db
JWT_SECRET=your_jwt_secret
PORT=5000

    Create the database in MySQL:

CREATE DATABASE cdb;

    Start the backend server:

npx nodemon server.js

Step 2: Setup Frontend Environment

    Open a new terminal and navigate to the frontend folder:

cd ../frontend

    Install dependencies:

npm install

    Create a .env file inside the frontend folder:

VITE_API_BASE_URL=http://localhost:5000/api

    Start the frontend development server:

npm run dev

    Open your browser at:

http://localhost:5173