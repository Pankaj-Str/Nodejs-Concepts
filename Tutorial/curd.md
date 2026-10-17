# Node.js CRUD Operations


## 1. What will we build?


Student Management System

- Add a new student
- Display all students in a table
- Edit and update student details
- Delete student records

## 2. Understand CRUD operations

| Operation | Meaning                | HTTP method |
| --------- | ---------------------- | ----------- |
| Create    | Add a student          | POST        |
| Read      | Display students       | GET         |
| Update    | Modify student details | PUT         |
| Delete    | Remove a student       | DELETE      |

We will use an in-memory array to keep the first example beginner-friendly. Data will reset when the Node.js server restarts. Later, you can replace the array with MySQL or MongoDB.

## 3. Install Node.js

First, install Node.js from the official website:

[Download Node.js](https://nodejs.org/?utm_source=chatgpt.com)

Check the installation in your terminal:

```
node -v
npm -v
```

If both commands display version numbers, you are ready to start.

## 4. Create the project

Open your terminal and run these commands:

```
mkdir node-crud-app
cd node-crud-app
npm init -y
npm install express
```

Create the following folder structure:

node-crud-app/

`server.js`

Backend

`public/`

`index.html`

`style.css`

`script.js`

Create the `public` folder and these three files inside it.

## 5. Create the Node.js backend — `server.js`

This file creates the Express server and handles all CRUD operations.

Open `server.js` and write the complete code below.

```

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS and JavaScript files
app.use(express.static(path.join(__dirname, "public")));

// Temporary student data
let students = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", course: "Python" },
    { id: 2, name: "Priya Patel", email: "priya@gmail.com", course: "Java" }
];

let nextId = 3;

// READ: Get all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// CREATE: Add a new student
app.post("/api/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name?.trim() || !email?.trim() || !course?.trim()) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const student = {
        id: nextId++,
        name: name.trim(),
        email: email.trim(),
        course: course.trim()
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student
    });
});

// UPDATE: Modify a student
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course } = req.body;

    if (!name?.trim() || !email?.trim() || !course?.trim()) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name.trim();
    student.email = email.trim();
    student.course = course.trim();

    res.json({
        message: "Student updated successfully",
        student
    });
});

// DELETE: Remove a student
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

```

### Backend code explained

- `express()` creates the Express application.
- `express.json()` reads JSON request bodies.
- `express.static()` serves our HTML, CSS, and JavaScript files.
- `GET /api/students` returns all student records.
- `POST /api/students` adds a record.
- `PUT /api/students/:id` updates a record by ID.
- `DELETE /api/students/:id` deletes a record by ID.
- `app.listen()` starts the server on port `3000`.

## 6. Create the HTML form — `public/index.html`

The HTML file contains the student form and the table that displays all records.

```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>Student Management System</h1>
        <p class="subtitle">Node.js CRUD Operations for Beginners</p>

        <div class="form-card">
            <h2 id="formTitle">Add Student</h2>

            <form id="studentForm">
                <input type="hidden" id="studentId">

                <label for="name">Student Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter student name"
                    required
                >

                <label for="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    required
                >

                <label for="course">Course</label>
                <select id="course" required>
                    <option value="">Select course</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                </select>

                <button type="submit" id="submitBtn">
                    Add Student
                </button>

                <button
                    type="button"
                    id="cancelBtn"
                    class="cancel-btn"
                    hidden
                >
                    Cancel Edit
                </button>
            </form>

            <p id="message" role="status" aria-live="polite"></p>
        </div>

        <div class="table-card">
            <h2>Student Records</h2>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody id="studentTable">
                        <tr>
                            <td colspan="5">Loading students...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

```

### What does this HTML do?

1. Takes student name, email, and course from the user.
2. Uses a hidden field to store the ID of the student being edited.
3. Provides a submit button for adding or updating records.
4. Displays student records in an HTML table.
5. Loads `script.js` to connect the form to the Node.js backend.

## 7. Add CSS styling — `public/style.css`

This CSS makes the form and student table clean and responsive.

```

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 30px 15px;
    font-family: Arial, sans-serif;
    background: #f3f6fb;
    color: #222;
}

.container {
    max-width: 1100px;
    margin: auto;
}

h1 {
    text-align: center;
    color: #173b70;
    margin-bottom: 8px;
}

.subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
}

.form-card,
.table-card {
    background: white;
    padding: 24px;
    margin-bottom: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 12px #00000010;
}

h2 {
    margin-top: 0;
    color: #173b70;
}

label {
    display: block;
    margin: 15px 0 7px;
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 11px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 15px;
}

button {
    margin-top: 18px;
    padding: 11px 17px;
    border: none;
    border-radius: 5px;
    background: #1769d2;
    color: white;
    cursor: pointer;
}

button:hover {
    opacity: 0.85;
}

.cancel-btn {
    background: #687386;
    margin-left: 5px;
}

.edit-btn {
    background: #198754;
    margin: 3px;
}

.delete-btn {
    background: #dc3545;
    margin: 3px;
}

.table-wrapper {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

th,
td {
    border-bottom: 1px solid #e5e7eb;
    padding: 12px;
    text-align: left;
    white-space: nowrap;
}

th {
    background: #173b70;
    color: white;
}

#message {
    margin-bottom: 0;
    color: #176b38;
}

@media (max-width: 600px) {
    .form-card,
    .table-card {
        padding: 15px;
    }

    h1 {
        font-size: 25px;
    }
}

```

## 8. Connect the HTML form with Node.js — `public/script.js`

This is the most important part of the project. JavaScript will send requests to the Express backend using the Fetch API.

It will handle all four CRUD operations:

- Add: Submit the form using `POST`.
- Show: Fetch all records using `GET`.
- Update: Load a record into the form and save it using `PUT`.
- Delete: Remove a record using `DELETE`.

```

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");

// Display messages
function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "#dc3545" : "#198754";
}

// Escape text before inserting it into HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// READ: Fetch and display all students
async function loadStudents() {
    try {
        const response = await fetch("/api/students");

        if (!response.ok) {
            throw new Error("Could not load students");
        }

        const students = await response.json();

        if (students.length === 0) {
            studentTable.innerHTML =
                '<tr><td colspan="5">No student records found.</td></tr>';
            return;
        }

        studentTable.innerHTML = students.map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${escapeHTML(student.name)}</td>
                <td>${escapeHTML(student.email)}</td>
                <td>${escapeHTML(student.course)}</td>
                <td>
                    <button class="edit-btn" data-action="edit"
                        data-id="${student.id}">Edit</button>
                    <button class="delete-btn" data-action="delete"
                        data-id="${student.id}">Delete</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        showMessage(error.message, true);
    }
}

// CREATE or UPDATE: Submit the form
studentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = studentId.value;

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value
    };

    const url = id
        ? `/api/students/${id}`
        : "/api/students";

    const method = id ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Operation failed");
        }

        showMessage(result.message);
        studentForm.reset();
        resetForm();
        await loadStudents();
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Handle Edit and Delete buttons
studentTable.addEventListener("click", async function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "edit") {
        try {
            const response = await fetch("/api/students");

            if (!response.ok) {
                throw new Error("Could not fetch students");
            }

            const students = await response.json();
            const student = students.find(item => item.id === id);

            if (!student) {
                throw new Error("Student not found");
            }

            studentId.value = student.id;
            nameInput.value = student.name;
            emailInput.value = student.email;
            courseInput.value = student.course;

            formTitle.textContent = "Update Student";
            submitBtn.textContent = "Update Student";
            cancelBtn.hidden = false;

            showMessage("Editing student ID: " + id);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } catch (error) {
            showMessage(error.message, true);
        }
    }

    // DELETE: Remove student
    if (action === "delete") {
        if (!confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {
            const response = await fetch(`/api/students/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Delete failed");
            }

            showMessage(result.message);
            await loadStudents();
        } catch (error) {
            showMessage(error.message, true);
        }
    }
});

// Reset the form to Add Student mode
function resetForm() {
    studentId.value = "";
    formTitle.textContent = "Add Student";
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

cancelBtn.addEventListener("click", function () {
    studentForm.reset();
    resetForm();
    showMessage("Edit cancelled");
});

// Load students when the page opens
loadStudents();

```

### How the form works

When you add a student:

1. The user fills out the HTML form.
2. `event.preventDefault()` prevents the page from reloading.
3. `fetch()` sends the form data to `/api/students`.
4. Express adds the student to the array.
5. `loadStudents()` refreshes the table.

When you update a student: Clicking Edit fills the form with the existing details. Submitting the form sends a `PUT` request with the student's ID.

When you delete a student: Clicking Delete asks for confirmation, sends a `DELETE` request, and refreshes the table.

## 9. Run the project

Open the terminal inside your `node-crud-app` directory.

Start the server:

```
node server.js
```

You should see:

```
Server running at http://localhost:3000
```

Now open this URL in your browser:

[Open Student Management System](http://localhost:3000?utm_source=chatgpt.com)

Keep the terminal running while using the application.

## 10. Test all CRUD operations

Test 1: Add Student

Enter these details in the form:

- Name: Amit Sharma
- Email: amit\@gmail.com
- Course: Python

Click Add Student. The new record should appear in the table.

Test 2: Show Students

Refresh the page. The table should show the two initial records and any records added during the current server session.

Test 3: Update Student

Click Edit next to Amit Sharma. Change the course from Python to Data Science and click Update Student.

Test 4: Delete Student

Click Delete next to the record you want to remove and confirm the action. The record should disappear from the table.

## 11. Understand the complete project flow

HTML Form + Student Table

index.html

Frontend JavaScript

script.js — Fetch API

Express.js REST API

server.js — GET, POST, PUT, DELETE

JavaScript Array

Temporary student records

## 12. API endpoints for practice

| Method | Endpoint          | Purpose             |
| ------ | ----------------- | ------------------- |
| GET    | `/api/students`   | Get all students    |
| POST   | `/api/students`   | Add a student       |
| PUT    | `/api/students/1` | Update student ID 1 |
| DELETE | `/api/students/1` | Delete student ID 1 |

These endpoints are useful for learning REST APIs and testing requests with tools such as Postman.

## 13. What should you learn next?

After completing this beginner project, try these improvements:

- Add MySQL or MongoDB to save records permanently.
- Add search and filter functionality.
- Add form validation and duplicate-email checks.
- Add student photos and pagination.
- Add admin login and authentication.

