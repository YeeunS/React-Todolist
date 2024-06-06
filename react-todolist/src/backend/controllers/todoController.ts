import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import todos from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userTodos = todos.filter((todo) => todo.userId === req.userId);
    res.json(userTodos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { content } = req.body;

  try {
    const newTodo = { id: uuidv4(), content, userId: req.userId! };
    todos.push(newTodo);

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const index = todos.findIndex(
      (todo) => todo.id === id && todo.userId === req.userId
    );
    if (index !== -1) {
      todos[index].content = content;
      res.json(todos[index]);
    } else {
      res.status(404).json({ message: "todo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const index = todos.findIndex(
      (todo) => todo.id === id && todo.userId === req.userId
    );
    if (index !== -1) {
      todos.splice(index, 1);
      res.json({ message: "todo deleted" });
    } else {
      res.status(404).json({ message: "todo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
