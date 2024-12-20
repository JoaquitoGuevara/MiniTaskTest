const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [
    { id: 1, task: 'Sample Task 1' },
    { id: 2, task: 'Sample Task 2' },
];

app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), task: req.body.task };
    tasks.push(newTask);
    res.json(newTask);
});
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(5001, () => console.log('Backend running'));
