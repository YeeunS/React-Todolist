import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../todosRTK";
import "./todolist.css";

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [changedInput, setChangedInput] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(
        createTodo({
          content: input,
        })
      );
      setInput("");
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: number, content: string) => {
    if (editId === id) {
      dispatch(
        updateTodo({
          id,
          partialTodo: { content: changedInput },
        })
      );
      setEditId(null);
      setChangedInput("");
    } else {
      setEditId(id);
      setChangedInput(content);
    }
  };

  return (
    <div className="todo-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <input
                type="text"
                value={changedInput}
                onChange={(e) => setChangedInput(e.target.value)}
              />
            ) : (
              <span>{todo.content}</span>
            )}
            <button onClick={() => handleEdit(todo.id, todo.content)}>
              {editId === todo.id ? "Save" : "Edit"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
