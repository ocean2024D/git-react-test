


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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center font-custom">
            <h1 className=" font-custom text-4xl text-red-950">TODO LIST</h1>
         
            <div>
              <input
                className=" font-custom inputDesign rounded-xl border-slate-800 w-80 h-12 border-4"
                type="text"
                placeholder="Add new todo"
                value={newTodo.todo}
                onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
              />
              <button
                className="button border-4 w-36 h-12 m-4 border-blue-950 rounded-xl bg-cyan-600 text-2xl"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
    
            <ul>
              {todos.map((todo) => (
                <li
                className="list text-blue-950 border-4 "
                
                key={todo.id}>
                  {editId === todo.id ? (
                    <>
                      <input
                       className="inputDesign border-slate-800 w-80 h-12 border-4"

                        type="text"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                      />
                      <button
                      className="save  bg-green-400 text-white m-2 border-4 w-32 border-blue-950 "
                       onClick={() => handleSave(todo.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <input type="text" value={todo.todo} disabled />
                      <button
                       className="edit bg-gray-600 text-white m-2 border-4 w-32 border-blue-950"
                        onClick={() => {
                          setEditId(todo.id);
                          setEditTodo(todo.todo);
                        }}
                      >
                        Edit
                      </button>
                      <button
                      className="delete bg-red-600 text-white m-2 border-4 w-32 border-blue-950"
                       onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
    export default App;
    