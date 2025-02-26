const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.put("/set-currency", authMiddleware, async (req, res) => {
    try {
        const { currency } = req.body;
        const validCurrencies = ["USD", "INR", "EUR", "GBP"];
        
        if (!validCurrencies.includes(currency)) {
            return res.status(400).json({ message: "Invalid currency" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { "wallet.currency": currency },
            { new: true }
        );

        res.json({ message: `Currency updated to ${currency}`, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;
