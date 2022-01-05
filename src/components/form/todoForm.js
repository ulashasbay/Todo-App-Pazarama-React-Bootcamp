import React from "react";
import axios from "axios";
import { useState } from "react";

function TodoForm({ apiUrl, allTodos, setAllTodos }) {
  // Todo input alanına yazılan bilginin tutulduğu state
  const [todoForm, setTodoForm] = useState({ isCompleted: false, content: "" });

  // Todo input alanına yazılan bilginin todoForm state ine atanmasını sağlan fonksiyon
  const inputChange = (e) => {
    setTodoForm({ isCompleted: false, content: e.target.value });
    e.preventDefault();
  };

  // Todo form submit edildiğinde todo nun apiye ve sayfaya eklenmesi
  const HandleSubmit = (e) => {
    if (e.key === "Enter") {
      if (e.target.value !== "" && e.target.value.length > 2) {
        axios.post(apiUrl, todoForm)
        .then((res) => setAllTodos([...allTodos, res.data]));
        e.target.value = "";
      }
      e.preventDefault();
    }
  };

  return (
    <div>
      <h1>
        <span className="styling">TODO</span> List
      </h1>
      <div className="input_div">
        <form onKeyPress={HandleSubmit}>
          <input
            className="input"
            placeholder="What needs to be done?"
            onChange={inputChange}
          />
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
