import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../todosRTK";
import "./todolist.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (e) => {
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

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, content) => {
    if (editId === id) {
      dispatch(
        updateTodo({
          id,
          partialTodo: { content: editInput },
        })
      );
      setEditId(null);
      setEditInput("");
    } else {
      setEditId(id);
      setEditInput(content);
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
            {" "}
            {/* each item has unique key */}
            {editId === todo.id ? (
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
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
