import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import todoAPI from "./APIs/todoAPIs";

interface Todo {
  id: number;
  content: string;
}

interface TodosState {
  items: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    const response = await todoAPI.getTodos();
    return response.data;
  }
);

export const createTodo = createAsyncThunk<Todo, Omit<Todo, "id">>(
  "todos/createTodo",
  async (newTodo) => {
    const response = await todoAPI.addTodo(newTodo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: number; partialTodo: Partial<Todo> }
>("todos/updateTodo", async ({ id, partialTodo }) => {
  const response = await todoAPI.updateTodo(id, partialTodo);
  return response.data;
});

export const deleteTodo = createAsyncThunk<number, number>(
  "todos/deleteTodo",
  async (id) => {
    await todoAPI.deleteTodo(id);
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.items = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
