import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './dashboard.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Errore nel recupero dei task:', err);
    }
  };

  const createTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await api.post('/tasks', { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error('Errore nella creazione del task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Ciao, {user?.email}</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section className="task-section">
        <h2>I tuoi task</h2>
        <div className="new-task-form">
          <input
            type="text"
            placeholder="Nuovo task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={createTask}>Crea</button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {task.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
