let todos = [
  { id: 1, content: "first todolist" },
  { id: 2, content: "abc" },
];

interface Todo {
  id: number;
  content: string;
}

const getTodos = (): Promise<{ data: Todo[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [...todos] });
    }, 500);
  });
};

const addTodo = (newTodo: Omit<Todo, "id">): Promise<{ data: Todo }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = todos.length
        ? Math.max(...todos.map((todo) => todo.id)) + 1
        : 1;
      const newTodoWithId = { ...newTodo, id: newId };
      todos = [...todos, newTodoWithId];
      resolve({ data: newTodoWithId });
    }, 500);
  });
};

const updateTodo = (
  id: number,
  partialTodo: Partial<Todo>
): Promise<{ data: Todo }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index === -1) {
        return reject(new Error("Todo not found"));
      }
      const updatedTodo = { ...todos[index], ...partialTodo };
      todos = [
        ...todos.slice(0, index),
        updatedTodo,
        ...todos.slice(index + 1),
      ];
      resolve({ data: updatedTodo });
    }, 500);
  });
};

const deleteTodo = (id: number): Promise<{ data: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.filter((todo) => todo.id !== id);
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
