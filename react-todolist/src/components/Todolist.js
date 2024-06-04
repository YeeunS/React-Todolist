// src/components/Todolist.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./todosSlice";
import "./todolist.css";

const Todolist = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = () => {
    const newItem = { content: input };
    dispatch(createTodo(newItem));
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, content) => {
    if (editId === null) {
      setEditId(id);
      setEditInput(content);
    } else {
      dispatch(updateTodo({ id, partialTodo: { content: editInput } }));
      setEditId(null);
      setEditInput("");
    }
  };

  return (
    <div className="todo-container">
      <div className="form-container">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={handleSubmit}>submit</button>
      </div>

      <div className="list-container">
        <ul>
          {todos.map((item) => (
            <li key={item.id}>
              {editId === item.id ? (
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              ) : (
                <span>{item.content}</span>
              )}

              <div className="todo-action">
                <button onClick={() => handleEdit(item.id, item.content)}>
                  {editId === item.id ? "save" : "edit"}
                </button>
                <button onClick={() => handleDelete(item.id)}>delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
