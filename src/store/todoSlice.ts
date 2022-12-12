import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  text: string;
  id: string;
  done: boolean;
};

export type InitialState = {
  todos: Todo[];
  newTodoText: string;
  filterDescending: boolean;
};
const initialState: InitialState = {
  todos: [],
  newTodoText: "",
  filterDescending: false,
};
const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push(action.payload);
      state.todos.sort(
        (a: any, b: any) =>
          (state.filterDescending ? -1 : 1) * a.text.localeCompare(b.text)
      );
    },
    remove: (state, action) => {
      // Doesn't work state.todos =
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleDone: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    },
    toggleDes: (state) => {
      state.filterDescending = !state.filterDescending;
    },
    setText: (state, action) => {
      state.newTodoText = action.payload;
    },
    clearText: (state) => {
      state.newTodoText = "";
    },
    sort: (state) => {
      state.todos.sort(
        (a: any, b: any) =>
          (state.filterDescending ? 1 : -1) * a.text.localeCompare(b.text)
      );
    },
  },
});

export const { add, remove, sort, clearText, toggleDes, setText, toggleDone } =
  todoSlice.actions;

export default todoSlice.reducer;
