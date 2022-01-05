import React from "react";
import "./App.css";
import axios from "axios";
import LoginForm from "./components/loginPage/loginForm";
import TodoHeader from "./components/header/todoHeader";
import TodoForm from "./components/form/todoForm";
import TodoList from "./components/list/todoList";
import { useState, useEffect } from "react";

function App() {
  // Api url
  const apiUrl = "https://61c41463f1af4a0017d9928d.mockapi.io/todos/";
  // Apidaki tüm todoların tutulacağı state
  const [allTodos, setAllTodos] = useState([]);
  // Local storagedeki username bilgisinin tutulduğu state
  const [username, setUsername] = useState(localStorage.getItem("username"));
  // Local storagedeki theme bilgisinin tutulduğu state
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  // Sayfa her açıldığında ya da refresh edildiğinde api den bilgilerin alınması ve theme ayarı
  useEffect(() => {
    axios(apiUrl).then((res) => setAllTodos(res.data));
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      setTheme(localStorage.getItem("theme"));
    }
    if (localStorage.getItem("theme") === "dark") {
      document.body.style.backgroundColor = "#121212"
    }
  }, []);

  return (
    // Local storage username bulundurmuyorsa login ekranının aksi halde Todo app ekranının gelmesi
    <div className="App" data-theme={theme}>
      {username ? (
        <>
          <TodoHeader username={username} theme={theme} setTheme={setTheme} />
          <TodoForm
            allTodos={allTodos}
            setAllTodos={setAllTodos}
            apiUrl={apiUrl}
          />
          <TodoList
            allTodos={allTodos}
            setAllTodos={setAllTodos}
            theme={theme}
            apiUrl={apiUrl}
          />
        </>
      ) : (
        <LoginForm username={username} setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
