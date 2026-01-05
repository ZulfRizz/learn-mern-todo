import { useState, useEffect, useEffectEvent } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

const API_BASE = "http://localhost:3001";

function App() {
    // state : tempat penyimpanan data sementara di browser
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    // use effect: dijalankan saat pertama kali memuat halaman
    useEffect(() => {
        GetTodos();
    }, []);

    // ambil data
    const GetTodos = () => {
        axios
            .get(API_BASE +"/todos")
            .then((res) => setTodos(res.data))
            .catch((err) => console.error("Error:", err));
    };

    // tambah data
    const addTodo = async () => {
        const data = await axios.post(API_BASE + "/todos/new", {
            text: newTodo,
        });

        setTodos([...todos, data.data]);
        setPopupActive(false);
        setNewTodo("");
    };

    // hapus data
    const deleteTodo = async (id) => {
        await axios.delete(API_BASE + "/todos/delete/" + id);

        setTodos((todos) => todos.filter((todo) => todo._id !== id));
    };

    // toggle complete
    const completeTodo = async (id) => {
        const data = await axios.put(API_BASE + "/todos/complete/" + id);

        setTodos((todos) =>
            todos.map((todo) => {
                if (todo._id === data.data._id) {
                    todo.complete = data.data.complete;
                }
                return todo;
            })
        );
    };

    return (
        <div className="App">
            <h1>Welcome, User</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                {todos.map((todo) => (
                    <div
                        className={"todo " + (todo.complete ? "is-complete" : "")}
                        key={todo._id}
                        onClick={() => completeTodo(todo._id)}
                    >
                        <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                        <div
                            className="delete-todo"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                deleteTodo(todo._id);
                            }}
                        >x</div>
                    </div>
                ))}
            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
            {popupActive ? (
                <div className="popup">
                    <div
                        className="closePopup"
                        onClick={() => setPopupActive(false)}
                    >x</div>
                    <div className="content">
                        <h3>Tambah Tugas</h3>
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <div className="button" onClick={addTodo}>
                            Create Task
                        </div>
                    </div>
                </div>
            ) : ("")}
        </div>
    );
}

export default App;
