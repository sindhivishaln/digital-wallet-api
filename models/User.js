const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallet: {
        balance: { type: Number, default: 0 },
        currency: { type: String, default: "USD" },
    },
    transactions: [
        {
            type: { type: String, enum: ["credit", "debit", "transfer"], required: true },
            amount: { type: Number, required: true },
            recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
            timestamp: { type: Date, default: Date.now },
        }
    ],
    dailySpent: { type: Number, default: 0 },
    lastTransactionDate: { type: Date, default: new Date() } 
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);
