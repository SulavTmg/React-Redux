import { createSlice, nanoid } from "@reduxjs/toolkit";
import { TodoType } from "../../types/todo";

interface TodoState {
  todos: TodoType[];
}

const initialState: TodoState = {
  todos: [{ id: "1", text: "hello world", completed: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
    },
    toggleCompleted: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
