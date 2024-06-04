import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoAPI from "./APIs/todoAPIs";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await todoAPI.getTodos();
  return response.data;
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo) => {
    const response = await todoAPI.addTodo(newTodo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, partialTodo }) => {
    const response = await todoAPI.updateTodo(id, partialTodo);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await todoAPI.deleteTodo(id);
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
