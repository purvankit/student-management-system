const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let students = [
  { id: 1, name: "Alice", email: "alice@mail.com", course: "ECE" },
  { id: 2, name: "Bob", email: "bob@mail.com", course: "CSE" }
];

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });
  res.json(student);
});

// POST new student
app.post('/students', (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    email,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT update student
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ message: "Not found" });

  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: "All fields required" });
  }

  student.name = name;
  student.email = email;
  student.course = course;

  res.json(student);
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});