import { useState, useEffect, useEffectEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

const API_BASE = "http://localhost:3001";

function App() {
  // state : tempat penyimpanan data sementara di browser
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  // use effect: dijalankan saat pertama kali memuat halaman 
  useEffect( () => {
    GetTodos();
  },[]);

  // ambil data
  const GetTodos = () => {
    axios.get(API_BASE, + "/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error:", err))
  }

  // tambah data
  const addTodo = async () => {
    const data = await axios.post(API_BASE + "/todos/new", {
      text: newTodo
    });

    setTodos([...todos,data.data])
    setPopupActive(false)
    setNewTodo("")
  }

  // hapus data
  const deleteData = async (id) => {
    await axios.delete(API_BASE + "/todos/delete" + id)

    setTodos(todos => todos.filter(todo => todo._id !== id));
  }

  // toggle complete
  const completeTodo = async (id) => {
    const data = await axios.put(API_BASE + "/todos/complete/" + id);

    setTodos(todos => todos.map(todo => {
      if(todo._id === data.data.id){
        todo.complete = data.data.complete;
      }
      return todo;
    }));
  }
  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
