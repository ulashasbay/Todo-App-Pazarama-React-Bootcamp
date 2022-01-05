import React from "react";

function TodoHeader({ username, theme, setTheme }) {
  // Theme buttonuna basıldığında çalışacak fonksiyon
  const HandleModeButton = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme(localStorage.getItem("theme"));
      document.body.style.backgroundColor = "#fff";
    } else {
      localStorage.setItem("theme", "dark");
      setTheme(localStorage.getItem("theme"));
      document.body.style.backgroundColor = "#121212";
    }
  };

  return (
    <div>
      <h4 className="username">
        Welcome <span id="userName">{username}!</span>
      </h4>

      {theme === "dark" ? (
        <button
          className="darkButton"
          data-theme={theme}
          onClick={HandleModeButton}
        >
          <i className="fas fa-sun"></i> Light Mode
        </button>
      ) : (
        <button
          className="darkButton"
          data-theme={theme}
          onClick={HandleModeButton}
        >
          <i className="fas fa-moon"></i> Dark Mode
        </button>
      )}
    </div>
  );
}

export default TodoHeader;
