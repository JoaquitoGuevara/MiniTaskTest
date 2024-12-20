import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5001/tasks')
            .then(response => setTasks(response.data))
            .catch(err => console.error(err));
    }, []);

    const addTask = () => {
        axios.post('http://localhost:5001/tasks', { task })
            .then(response => setTasks([...tasks, response.data]))
            .catch(err => console.error(err));
        setTask('');
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5001/tasks/${id}`)
            .then(() => setTasks(tasks.filter(t => t.id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Type your task here'
            />
            <button className='add' onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        <span>{t.task}</span>
                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
