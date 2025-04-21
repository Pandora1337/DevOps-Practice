const express = require('express');
const mongoose = require('mongoose');

const IP = process.env.SERVICE_IP || "localhost"
const PORT = parseInt(process.env.PORT) || 3000;
const DB_IP = process.env.DB_IP || "localhost"
const DB_PORT = parseInt(process.env.DB_PORT) || 27017
const DB_USER = process.env.DB_USER || "admin"
const DB_PASS = process.env.DB_PASS || "admin"


const app = express();
app.use(express.json())
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_IP}:${DB_PORT}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "New Task"
    },
    body: {
        type: String,
        required: false,
        default: ""
    },
    completed: {
        type: String,
        required: false,
        default: false
    },
})
const Todo = mongoose.model('Todo', TodoSchema)

// Get all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
});

// Get the last 5 todos
app.get('/todos/last', async (req, res) => {
    const todos = await Todo.find()
        .sort({ _id: -1 })
        .limit(5)
        .exec((err, entries) => {
            if (err) {
                console.error(err);
            } else {
                console.log(entries);
            }
        });
    res.json(todos)
});

// Add new todo
app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body)
    await todo.save()
    res.status(201).json(todo)
});

// Get todo by id
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findById(id)

    if (!todo) {
        res.status(404).json({ error: "No todo found" })
        return
    }

    res.json(todo)
});

// Update todo by id
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })

    if (!todo) {
        res.status(404).json({ error: "No todo found" })
        return
    }

    res.json(todo)
});

// Delete todo by id
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id
    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
        res.status(404).json({ error: "No todo found" })
        return
    }

    res.json({ msg: "Todo deleted!" })
});

app.listen(PORT, () => {
    console.log(`API is running on http://${IP}:${PORT}`);
});
