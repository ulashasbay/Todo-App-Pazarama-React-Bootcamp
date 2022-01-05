import React from "react";
import { useState } from "react";

function LoginForm({ setUsername }) {
  // Login input alanına yazılan yazıların tutulduğu state
  const [loginInput, setLoginInput] = useState("");

  // Login Form submit edildiğinde input içine yazılan username'in localstorage içine kaydedilmesi
  // localstoragedeki username bilgisinin username state ine atanmasını sağlayan fonksiyon
  const handleLoginSubmit = (e) => {
    if (e.target.value !== "") {
      localStorage.setItem("username", loginInput);
      setUsername(localStorage.getItem("username"));
    }
    e.preventDefault();
  };

  // Login input alanına yazılan bilginin login input statetine atanmasını sağlayan fonksiyon
  const loginInputChange = (e) => {
    setLoginInput(e.target.value);
    e.preventDefault();
  };

  return (
    <div>
      <div className="input_login_div">
        <form onSubmit={(e) => handleLoginSubmit(e)}>
          <label className="username_login">Sign In</label>
          <input
            className="input_login"
            placeholder="Username"
            onChange={(e) => loginInputChange(e)}
          />
          <button className="login_button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
