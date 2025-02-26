Digital Wallet API

This is a mini digital wallet system built using Node.js and MongoDB. It allows users to register, authenticate, manage their wallet, perform transactions, and view transaction history.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Token)
Security: bcrypt, helmet, express-rate-limit
Error Handling: Custom error handling middleware

Setup & Installation

1️⃣ Clone the Repository
git clone https://github.com/sindhivishaln/digital-wallet-api.git
cd digital-wallet-api

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EXCHANGE_RATE_API_KEY=your_api_key (optional)

4️⃣ Run the Server
npm start


API Endpoints  

Method	Endpoint	                       Description <br>
POST	  /api/auth/register	             Register a new user
POST	  /api/auth/login	                 Login & get JWT token
GET	    /api/auth/me	                   Get logged-in user details
GET	    /api/wallet/balance	             Get wallet balance
PUT	    /api/wallet/currency             Update Wallet Currency
POST	  /api/transactions/deposit	       Deposit Funds
POST	  /api/transactions/transfer	     Transfer Funds with Fraud Detection
POST    /api/transactions/withdraw	     Withdraw Funds
GET	    /api/transactions/history	       Get Transaction History
PUT	    /api/users/set-currency	         Update User Currency Preference



