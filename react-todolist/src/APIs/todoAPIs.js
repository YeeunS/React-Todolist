let todos = [
  { id: 1, content: "first todolist" },
  { id: 2, content: "abc" },
];

const getTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [...todos] });
    }, 500);
  });
};

const addTodo = (newTodo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = todos.length
        ? Math.max(...todos.map((todo) => todo.id)) + 1
        : 1;
      const newTodoWithId = { ...newTodo, id: newId };
      const newTodos = [...todos, newTodoWithId];
      todos = newTodos;
      resolve({ data: newTodoWithId });
    }, 500);
  });
};

const updateTodo = (id, partialTodo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index === -1) {
        return reject(new Error("Todo not found"));
      }
      const updatedTodo = { ...todos[index], ...partialTodo };
      const newTodos = [
        ...todos.slice(0, index),
        updatedTodo,
        ...todos.slice(index + 1),
      ];
      todos = newTodos;
      resolve({ data: updatedTodo });
    }, 500);
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      todos = newTodos;
      resolve({ data: id });
    }, 500);
  });
};

const todoAPI = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default todoAPI;
