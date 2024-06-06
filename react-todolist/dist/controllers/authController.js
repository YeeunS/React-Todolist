"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = { id: (0, uuid_1.v4)(), username, password: hashedPassword };
        User_1.default.push(newUser);
        res.status(201).json({ message: "user created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = User_1.default.find((user) => user.username === username);
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
