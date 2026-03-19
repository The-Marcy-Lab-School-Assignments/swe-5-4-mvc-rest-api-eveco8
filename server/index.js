const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

const todoControllers = require('../server/controllers/controllers.js')

// TODO: GET /api/todos
// Response: 200, array of all todos
app.get('/api/todos', todoControllers.listTodos)


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
app.get('/api/todos/:id', todoControllers.findTodo)


// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body
app.post('/api/todos', todoControllers.createTodo)


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id
app.patch('/api/todos/:id', todoControllers.updateTodo)


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id
app.delete('/api/todos/:id', todoControllers.destroyTodo )


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)




const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
