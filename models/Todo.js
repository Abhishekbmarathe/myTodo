import mongoose from 'mongoose';

// Define schema for todos collection
const todoSchema = new mongoose.Schema({
    // Define schema fields
    description: String,

},);

// Create model for todos collection
const Todo = mongoose.model('Todo', todoSchema,);

export default Todo;
