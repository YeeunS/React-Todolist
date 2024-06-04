import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../todosRTK";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
