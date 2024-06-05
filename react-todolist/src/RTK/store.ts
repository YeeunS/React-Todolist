import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosRTK";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
