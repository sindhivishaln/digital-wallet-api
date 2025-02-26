const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Get Wallet Balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ balance: user.wallet.balance, currency: user.wallet.currency });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update Wallet Currency
router.put("/currency", authMiddleware, async (req, res) => {
    try {
        const { currency } = req.body;
        const validCurrencies = ["USD", "EUR", "INR", "GBP"];

        if (!validCurrencies.includes(currency)) {
            return res.status(400).json({ message: "Invalid currency" });
        }

        const user = await User.findByIdAndUpdate(req.user.id, { "wallet.currency": currency }, { new: true });
        res.json({ message: "Currency updated", currency: user.wallet.currency });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
