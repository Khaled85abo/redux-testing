import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  remove,
  add,
  sort,
  clearText,
  setText,
  toggleDes,
  toggleDone,
} from "../store/todoSlice";

const TodoList = () => {
  const { todos, newTodoText, filterDescending } = useAppSelector(
    (state) => state.todos
  );
  const dispatch = useAppDispatch();

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      add({
        text: newTodoText,
        id: uuidv4(),
        done: false,
      })
    );
    dispatch(clearText());
  };

  const removeTodo = (id: string) => {
    dispatch(remove(id));
  };

  const sortTodos = (desc: boolean) => {
    dispatch(sort());
  };

  return (
    <>
      <form onSubmit={addTodo}>
        <input
          placeholder="Skriv en todo..."
          onChange={(event) => dispatch(setText(event.target.value))}
          value={newTodoText}></input>
        <button type="submit" disabled={newTodoText.length === 0}>
          Lägg till
        </button>
      </form>
      <h2>
        Todo
        <button
          onClick={() => {
            dispatch(toggleDes());
            sortTodos(filterDescending);
          }}>
          {filterDescending ? <FaArrowUp /> : <FaArrowDown />}
        </button>
      </h2>

      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => dispatch(toggleDone(todo.id))}
                style={{
                  textDecoration: todo.done ? "line-through" : "underline",
                }}>
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Du har inga todos</p>
      )}
    </>
  );
};

export default TodoList;
