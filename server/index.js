const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

// middleware
app.use(express.json)
app.use(cors())

// db connection
mongoose.connect('mongodb://localhost:27017/todo-db')
    .then(() => console.log("terhubung ke mongodb"))
    .catch(err => console.error(err))

const TodoSchema = new mongoose.Schema({
    text: String,
    complete: {type: Boolean, default: false}
})

const Todo = mongoose.model('Todo', TodoSchema);

// routes (API endpoints)


app.get('/todos', async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos)
})

app.post('todos/new', async (req,res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
})

app.delete('todos/delete/:id', async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.put('todos/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
})


app.listen(3001, () => console.log("server berjalan di port 3001"))