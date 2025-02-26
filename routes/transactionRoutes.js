const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const { convertCurrency } = require("../utils/currencyConverter");
const { isTransactionSuspicious } = require("../utils/fraudDetection");

const router = express.Router();

// Deposit Funds
router.post("/deposit", authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount <= 0) return res.status(400).json({ message: "Amount must be greater than zero" });

        const user = await User.findById(req.user.id);
        user.wallet.balance += amount;
        user.transactions.push({ type: "credit", amount });

        await user.save();
        res.json({ message: "Deposit successful", balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Transfer Funds with Fraud Detection
router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const { recipientEmail, amount } = req.body;
        const sender = await User.findById(req.user.id);
        const recipient = await User.findOne({ email: recipientEmail });

        if (!recipient) return res.status(404).json({ message: "Recipient not found" });
        if (sender.wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

        // Fraud Detection Check
        const fraudCheck = isTransactionSuspicious(sender, amount);
        if (fraudCheck.flagged) {
            return res.status(403).json({ message: "Transaction flagged!", reason: fraudCheck.reason });
        }

        sender.wallet.balance -= amount;
        recipient.wallet.balance += amount;

        sender.dailySpent += amount;  // Update daily spent amount
        sender.lastTransactionDate = new Date();

        await sender.save();
        await recipient.save();

        res.json({ message: `Transferred ${amount} ${sender.wallet.currency} successfully` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Withdraw Funds
router.post("/withdraw", authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount <= 0) return res.status(400).json({ message: "Amount must be greater than zero" });

        const user = await User.findById(req.user.id);
        if (user.wallet.balance < amount) return res.status(400).json({ message: "Insufficient funds" });

        user.wallet.balance -= amount;
        user.transactions.push({ type: "debit", amount });

        await user.save();
        res.json({ message: "Withdrawal successful", balance: user.wallet.balance });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Transaction History
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("transactions")
            .populate("transactions.recipient", "name email");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;
