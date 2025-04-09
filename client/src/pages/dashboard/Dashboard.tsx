import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import Navbar from '../../components/navbar/Navbar';
import { Check, Trash2, Edit, Save } from 'lucide-react';
import './dashboard.css';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

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

  const completeTask = async (id: string) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: true });
      setTasks(tasks.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error('Errore nel completamento del task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Errore durante l\'eliminazione:', err);
    }
  };

  const updateTask = async (id: string) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title: editTitle });
      setTasks(tasks.map(t => t.id === id ? res.data : t));
      setEditingId(null);
      setEditTitle('');
    } catch (err) {
      console.error('Errore durante l\'aggiornamento:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  console.log('DASHBOARD user:', user);
  return (
    <div className="dashboard-wrapper">
      <Navbar user={user} onLogout={logout} />
      <main className="dashboard-main">
        <div className="todo-container">
          <h1 className="todo-title">Todo App</h1>

          {/* Nuovo task */}
          <div className="new-task-input">
            <input
              type="text"
              placeholder="Aggiungi un nuovo task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={createTask} className="add-btn">+</button>
          </div>

          {/* Task da completare */}
          <ul className="todo-list">
            {pendingTasks.map((task) => (
              <li key={task.id} className="todo-item">
                {editingId === task.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button onClick={() => updateTask(task.id)} title="Salva">
                      <Save size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    {task.title}
                    <div className="task-actions">
                      <button onClick={() => completeTask(task.id)} title="Completa">
                        <Check size={18} />
                      </button>
                      <button onClick={() => {
                        setEditingId(task.id);
                        setEditTitle(task.title);
                      }} title="Modifica">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteTask(task.id)} title="Elimina">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <p className="pending-text">Hai {pendingTasks.length} task da completare</p>

          {/* Task completati */}
          {completedTasks.length > 0 && (
            <>
              <h3 className="completed-title">Completati</h3>
              <ul className="todo-list completed">
                {completedTasks.map((task) => (
                  <li key={task.id} className="todo-item">
                    {task.title}
                    <div className="task-actions">
                      <button onClick={() => deleteTask(task.id)} title="Elimina">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
