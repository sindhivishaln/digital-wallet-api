Digital Wallet API

This is a mini digital wallet system built using Node.js and MongoDB. It allows users to register, authenticate, manage their wallet, perform transactions, and view transaction history.

Tech Stack<br>
Backend: Node.js, Express.js<br>
Database: MongoDB (Mongoose ORM)<br>
Authentication: JWT (JSON Web Token)<br>
Security: bcrypt, helmet, express-rate-limit<br>
Error Handling: Custom error handling middleware<br>

Setup & Installation<br>

1️⃣ Clone the Repository<br>
git clone https://github.com/sindhivishaln/digital-wallet-api.git<br>
cd digital-wallet-api<br>

2️⃣ Install Dependencies<br>
npm install<br>

3️⃣ Setup Environment Variables<br>
PORT=5000<br>
MONGO_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_jwt_secret<br>
EXCHANGE_RATE_API_KEY=your_api_key (optional)<br>

4️⃣ Run the Server<br>
npm start<br><br>


API Endpoints  

POST - /api/auth/register - Register a new user<br>
POST - /api/auth/login - Login & get JWT token<br>
GET - /api/auth/me - Get logged-in user details<br>
GET - /api/wallet/balance - Get wallet balance<br>
PUT - /api/wallet/currency - Update Wallet Currency<br>
POST - /api/transactions/deposit - Deposit Funds<br>
POST - /api/transactions/transfer - Transfer Funds with Fraud Detection<br>
POST - /api/transactions/withdraw - Withdraw Funds<br>
GET - /api/transactions/history - Get Transaction History<br>
PUT - /api/users/set-currency - Update User Currency Preference<br>



