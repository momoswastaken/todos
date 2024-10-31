"use client"; 

import React, { useState } from "react";

type TodoProps = {
  id: number;
  title: string;
  completed: boolean;
};

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === "") return;

    const newTodo: TodoProps = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="w-2/4 bg-black p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-center font-extrabold text-4xl text-white mb-6">To Do List</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 p-2 rounded border border-gray-300"
            placeholder="Add a new task"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-lg ${
                todo.completed ? "bg-green-200" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="h-5 w-5"
                />
                <span
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
