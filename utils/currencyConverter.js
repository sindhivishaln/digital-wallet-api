const exchangeRates = {
    "USD": { "INR": 83, "EUR": 0.92, "GBP": 0.78 },
    "INR": { "USD": 0.012, "EUR": 0.011, "GBP": 0.0094 },
    "EUR": { "USD": 1.08, "INR": 91, "GBP": 0.85 },
    "GBP": { "USD": 1.28, "INR": 106, "EUR": 1.18 }
};

const convertCurrency = (amount, from, to) => {
    if (from === to) return amount;
    return amount * (exchangeRates[from]?.[to] || 1);
};

module.exports = { convertCurrency };