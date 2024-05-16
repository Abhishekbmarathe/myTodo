import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Todo from './models/Todo.js'

const app = express()
const port = 3000


mongoose.connect("mongodb://127.0.0.1:27017/todo")
    .then(() => {
        console.log("MONGODB connected Successfully...");
    })
    .catch((e) => {
        console.log("MONGODB connection Failed...", e);
    })

// setting body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// setting ejs template engine
app.set('view engine', 'ejs')

// serving static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));



// rendering default page
app.get('/', async (req, res) => {
    try {
        // Fetch all todos from the database
        const todos = await Todo.find({});
        // Render the EJS template with the fetched todos data
        res.render('index.ejs', { todos });
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        res.status(500).send("Failed to fetch todos.");
    }
});

app.post('/add', async (req, res) => {
    const todoData = req.body
    const newTodo = new Todo(todoData);
    await newTodo.save()
    // console.log(todoData);
    console.log("Data saved Successfully...")
    res.redirect('/')
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id; // Access the todoId from the URL parameter
        await Todo.findByIdAndDelete(todoId);
        res.sendStatus(204); // Send a 204 No Content status to indicate successful deletion
    } catch (error) {
        console.error('Failed to delete todo:', error);
        res.status(500).send('Failed to delete todo');
    }
});



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
