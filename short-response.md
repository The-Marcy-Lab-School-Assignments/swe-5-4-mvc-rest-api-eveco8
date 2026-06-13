# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

One design decision in the API that make it RESTful is the URL endpoints describe resources not actions. Instead of saying `'/api/getTodos'` it's `'/api/todos'`. The `GET` HTTP method already communicates "retrieve" so having "get" in the endpoint is redundant. Another decision that makes the API RESTful is that the HTTP methods indicate the desired actions so that the endpoint can stay focused on naming the resource. For example, `PATCH /api/todos/:id` tells the client "update this specific todo" without needing a URL like `/api/updateTodo`. A third decision is the use of specific HTTP status codes that communicate the outcome of each request. `201` when a new todo is made, `404` when an id doesn't exist, and `204` after a successful delete all give the client meaningful feedback without having to dig through a response body to figure out what happened.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

Mixing data logic and request/response logic in one file makes the code harder to maintain because any change to how data is stored means touching the same code that handles HTTP. For example, in `index.js`, if `updateTodo` reaches directly into the `todos` array while also reading `req.params` and calling `res.send()`, those two concerns are mixed together. If you ever wanted to swap the in-memory array for a real database, you'd have to rewrite the entire function instead of just the data part. Separating into a model and controller fixes this because the model in `models.js` only deals with data and the controller in `controllers.js` only deals with HTTP. That means you can change the data layer without breaking the response logic, and you can test each piece independently.

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

When the user clicks a checkbox, the click event fires on `#todos-list` in `main.js` and calls `handleTodosListClick`. That function detects that the clicked element has the class `toggle-btn`, reads `isDone` from `e.target.checked`, and grabs the `id` from `clickedListItem.dataset.id`. It then calls `updateTodo(id, { isDone })` from `fetch-helpers.js`, which sends a `PATCH` request to `/api/todos/:id` with `{ isDone }` as the JSON body. On the server side, Express in `index.js` matches that route to `app.patch('/api/todos/:id', updateTodo)` and calls the `updateTodo` handler. That handler pulls `id` from `req.params` and `isDone` from `req.body`, finds the matching todo using `todos.find()`, updates its `isDone` field, and sends the updated object back with `res.send()`. Once the response comes back, `main.js` calls `loadTodos()` which re-fetches the full list and passes it to `renderTodos()` in `dom-helpers.js` to re-render the updated UI.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

Line 1 (`const { task } = req.body`) belongs in the **controller** because it's reading data directly off the HTTP request object which is an HTTP concern, not a data concern. Line 2 (`if (!task) return res.status(400)...`) also belongs in the **controller** because it's sending an HTTP error response back to the client, which is the controller's job. Line 3 (`const newTodo = { id: getId(), task, isDone: false }`) belongs in the **model** because it's defining the shape of a new todo and generating its id which is a pure data logic that has nothing to do with HTTP. Line 4 (`todos.push(newTodo)`) also belongs in the **model** because it's writing directly to the data store. Line 5 (`res.status(201).send(newTodo)`) belongs in the **controller** because it's sending the HTTP response with a `201 Created` status, which is request/response logic.
