const DAILY_LIMIT = 1000;  // Set daily limit (can be configurable)
const HIGH_VALUE_THRESHOLD = 5000;  // Flag transactions above this amount

const isTransactionSuspicious = (user, amount) => {
    const today = new Date().toISOString().split("T")[0];  // Get today's date
    const lastTransactionDate = user.lastTransactionDate.toISOString().split("T")[0];

    // Reset daily spent if it's a new day
    if (lastTransactionDate !== today) {
        user.dailySpent = 0;
        user.lastTransactionDate = new Date();
    }

    // Check if transaction exceeds daily limit
    if (user.dailySpent + amount > DAILY_LIMIT) {
        return { flagged: true, reason: "Daily transaction limit exceeded" };
    }

    // Check if transaction is unusually high
    if (amount > HIGH_VALUE_THRESHOLD) {
        return { flagged: true, reason: "High-value transaction detected" };
    }

    return { flagged: false };
};

module.exports = { isTransactionSuspicious };
