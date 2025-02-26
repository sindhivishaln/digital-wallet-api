const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit each IP to 100 requests per window
    message: { message: "Too many requests, please try again later." },
    headers: true,
});

module.exports = apiLimiter;
