// src/components/todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(baseURL);
  return response.json();
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo) => {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return response.json();
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, partialTodo }) => {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialTodo),
    });
    return response.json();
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
