"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const uuid_1 = require("uuid");
const Todo_1 = __importDefault(require("../models/Todo"));
const getTodos = async (req, res) => {
    try {
        const userTodos = Todo_1.default.filter((todo) => todo.userId === req.userId);
        res.json(userTodos);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    const { content } = req.body;
    try {
        const newTodo = { id: (0, uuid_1.v4)(), content, userId: req.userId };
        Todo_1.default.push(newTodo);
        res.status(201).json(newTodo);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const index = Todo_1.default.findIndex((todo) => todo.id === id && todo.userId === req.userId);
        if (index !== -1) {
            Todo_1.default[index].content = content;
            res.json(Todo_1.default[index]);
        }
        else {
            res.status(404).json({ message: "todo not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const index = Todo_1.default.findIndex((todo) => todo.id === id && todo.userId === req.userId);
        if (index !== -1) {
            Todo_1.default.splice(index, 1);
            res.json({ message: "todo deleted" });
        }
        else {
            res.status(404).json({ message: "todo not found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteTodo = deleteTodo;
