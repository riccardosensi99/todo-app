import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Navbar from '../../components/navbar/Navbar';
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
    <div className="dashboard-wrapper">
      <Navbar user={user} onLogout={logout} />
      <main className="dashboard-main">
        <div className="todo-container">
          <h1 className="todo-title">Todo App</h1>
          <div className="new-task-input">
            <input
              type="text"
              placeholder="Aggiungi un nuovo task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={createTask} className="add-btn">+</button>
          </div>

          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id} className="todo-item">
                {task.title}
              </li>
            ))}
          </ul>

          <p className="pending-text">Hai {tasks.length} task da completare</p>
        </div>
      </main>
    </div>
  );
}