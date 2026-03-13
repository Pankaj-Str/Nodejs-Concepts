**REST API in Node.js**  


### What is a REST API?

You want your phone app / website / another program to talk to your server and do these 4 main things with data:

| Action    | HTTP Method | What it does                  | Example sentence                     |
|-----------|-------------|-------------------------------|--------------------------------------|
| Read      | GET         | Get/list/show data            | "Give me all books"                  |
| Create    | POST        | Add new thing                 | "Add this new book"                  |
| Update    | PUT / PATCH | Change existing thing         | "Change price of book #3"            |
| Delete    | DELETE      | Remove thing                  | "Delete book #7"                     |

→ REST = just using these 4 verbs (GET/POST/PUT/DELETE) in a clean, predictable way.

We will build a **very simple "To-do list" API** — no database yet, just array in memory.

### Step 1: Create project folder

```bash
mkdir rest-api-todo
cd rest-api-todo
npm init -y
```

### Step 2: Install Express (only one important package)

```bash
npm install express
```

### Step 3: Create `index.js` (main file)

Copy-paste this complete code:

```js
const express = require('express');
const app = express();
const port = 3000;

// Important: let Express understand JSON we send from Postman / frontend
app.use(express.json());

// Fake database → just normal array (later you replace with MongoDB)
let todos = [
  { id: 1, task: "Learn REST API", done: false },
  { id: 2, task: "Make coffee", done: true }
];

// ────────────────────────────────────────────────
// 1. GET /todos     → show all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// 2. GET /todos/:id → show ONE todo
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found 😢" });
  }

  res.json(todo);
});

// 3. POST /todos    → create new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,           // simple auto-increment (not perfect but ok for learning)
    task: req.body.task,
    done: false                     // default value
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);    // 201 = created
});

// 4. PUT /todos/:id → update todo (change task or done status)
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // Update only fields that were sent
  if (req.body.task !== undefined) todo.task = req.body.task;
  if (req.body.done !== undefined) todo.done = req.body.done;

  res.json(todo);   // return updated version
});

// 5. DELETE /todos/:id → remove todo
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(index, 1);           // remove from array
  res.status(204).send();           // 204 = no content (success but nothing to return)
});

// Start server
app.listen(port, () => {
  console.log(`🎉 Server running → http://localhost:${port}`);
});
```

### Step 4: Add start command (optional but nice)

Open `package.json` and change `"scripts"` part to:

```json
"scripts": {
  "start": "node index.js"
}
```

### Step 5: Run it!

```bash
npm start
```

You should see:  
`🎉 Server running → http://localhost:3000`

### Step 6: Test it! (use Postman, Thunder Client, or browser)

**Best & easiest for beginners in 2026 → install VS Code + Thunder Client extension** (free Postman alternative inside VS Code)

Or download Postman (also free).

#### Test requests (copy-paste these):

1. **GET all todos**  
   - Method: GET  
   - URL: `http://localhost:3000/todos`  
   → You see both items

2. **GET one todo**  
   - GET `http://localhost:3000/todos/1`

3. **Create new todo** (POST)  
   - Method: POST  
   - URL: `http://localhost:3000/todos`  
   - Body → raw → JSON:  
     ```json
     {
       "task": "Buy milk"
     }
     ```  
   → You get back the new item with id:3

4. **Update todo** (PUT)  
   - PUT `http://localhost:3000/todos/1`  
   - Body JSON:  
     ```json
     {
       "done": true,
       "task": "Learned REST API 🎉"
     }
     ```

5. **Delete todo**  
   - DELETE `http://localhost:3000/todos/2`  
   → status 204 (success, no content)

### Summary Table – What you just learned

| Route              | Method | What it does             | Status codes you saw |
|---------------------|--------|--------------------------|----------------------|
| /todos             | GET    | List all                 | 200                  |
| /todos/:id         | GET    | Get one                  | 200 / 404            |
| /todos             | POST   | Create                   | 201                  |
| /todos/:id         | PUT    | Update                   | 200 / 404            |
| /todos/:id         | DELETE | Delete                   | 204 / 404            |

