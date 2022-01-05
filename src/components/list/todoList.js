import React from "react";
import Todo from "./todo";

function TodoList({ apiUrl, theme, allTodos, setAllTodos }) {
  // Todo ların listelenmesi
  return (
    <div className="container">
      {allTodos &&
        allTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              apiUrl={apiUrl}
              todo={todo}
              theme={theme}
              allTodos={allTodos}
              setAllTodos={setAllTodos}
            />
          );
        })}
    </div>
  );
}

export default TodoList;
