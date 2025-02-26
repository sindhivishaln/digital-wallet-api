require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiLimiter = require("./middleware/rateLimiter");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
    res.send("Wallet API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
