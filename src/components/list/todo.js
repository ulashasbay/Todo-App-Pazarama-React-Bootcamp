import React from "react";
import axios from "axios";
import { useState } from "react";

function Todo({ apiUrl, todo, theme, allTodos, setAllTodos }) {
  // Todo nun edit edilip edilemeyeceği bilgisini tutan state
  const [editable, setEditable] = useState(false);
  // Edit edilen todo nun bilgisini içeren state
  const [editInput, setEditInput] = useState(todo.content);

  // Todo içindeki Delete tuşuna basıldığında o todo nun apiden ve sayfadan silinmesini sağlayan fonksiyon
  const handleDelete = (itemId) => {
      axios.delete(`${apiUrl}${itemId}`, { params: { id: itemId } })
      .then((res) => {
        if (res.status !== "error") {
          setAllTodos(
            allTodos.filter((item) => {
              return item.id !== itemId;
            })
          );
        }
      });
  };

  // Edit tuşuna basıldığında todo nun editlenebilir hale gelmesini sağlayan fonksiyon
  const handleEdit = () => {
    setEditable(!editable);
  };

  // Editlenen Todo nun apide ve sayfada güncellenmesini sağlayan fonksiyon
  const handleİnputChange = async (e, itemId) => {
    if (e.key === "Enter") {
      if (e.target.value !== "" && e.target.value.length > 2) {
        await axios.put(`${apiUrl}${itemId}`, { content: e.target.value });
        await axios(apiUrl).then((res) => setAllTodos(res.data));
        setEditable(!editable);
      }
    }
  };

  // Edit input alanındaki yazılan bilgilerin editInput state ine atanması
  const editInputChange = (e) => {
    setEditInput(e.target.value);
    e.preventDefault();
  };

  // Check butonuna basıldığında çalışan fonksiyon
  const handleCompleted = async (item) => {
    await axios.put(`${apiUrl}${item.id}`, { isCompleted: !item.isCompleted });
    axios(apiUrl).then((res) => setAllTodos(res.data));
  };

  return (
    <div>
      <div className="item" key={todo.id}>
        <button className="checkbox" onClick={() => handleCompleted(todo)}>
          {todo.isCompleted ? (
            <i className="fas fa-check-square"></i>
          ) : (
            <i className="far fa-square"></i>
          )}
        </button>

        {editable ? (
          <input
            type="text"
            className="item_edit_input"
            onChange={editInputChange}
            onKeyPress={(e) => handleİnputChange(e, todo.id)}
            value={editInput}
          />
        ) : (
          <input
            type="text"
            data-theme={theme}
            className={todo.isCompleted ? "item_input_checked" : "item_input"}
            value={todo.content}
            disabled
          />
        )}

        <button className="editButton" onClick={(e) => handleEdit(e)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="removeButton" onClick={() => handleDelete(todo.id)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default Todo;
