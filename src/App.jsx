


import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Base_Url = "http://localhost:3000";
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ todo: "" });
  const [editId, setEditId] = useState();
  const [editTodo, setEditTodo] = useState("");

  // GET
  const getTodos = async () => {
    const response = await axios.get(Base_Url + "/todos");
    setTodos(response.data);
  };

  // CREATE
  const createTodos = async (newTodo) => {
    await axios.post(`${Base_Url}/todos`, newTodo);
    getTodos();
  };

  // UPDATE
  const updateTodo = async (todoId, updatedTodo) => {
    await axios.put(`${Base_Url}/todos/${todoId}`, updatedTodo);
    getTodos();
    setEditId(null);
  };

  // ADD TODO
  const handleAddTodo = () => {
    createTodos(newTodo);
    setNewTodo({ todo: "" });
  };

  //  SAVE
  const handleSave = (todoId) => {
    updateTodo(todoId, { todo: editTodo });
  };

  //DELETE
  const deleteTodo = async (todoId) => {
    const deletedResponse = await axios.delete(`${Base_Url}/todos/${todoId}`);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>TODO LIST</h1>
      <div>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo.todo}
          onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

     <ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      {editId === todo.id ? (
        <>
          <input
            type="text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
          <button onClick={() => handleSave(todo.id)}>Save</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={todo.todo}
            disabled
          />
          <button
            onClick={() => {
              setEditId(todo.id);
              setEditTodo(todo.todo);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ul>

    </>
  );
}

export default App;
