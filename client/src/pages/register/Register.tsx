import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../login/login.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await api.post('/auth/register', { name, email, password });
      setSuccess('Registrazione completata! Ora puoi accedere.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError('Errore durante la registrazione. L’email potrebbe essere già in uso.');
    }
  };

  return (
    <>
    <div className='login-header'>
      <h1>Todo App</h1>
    </div>
    <div className="register-container">
      <div className="register-wrapper">
        <h2>Registrati</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Crea account</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
        <p className="link">
          Hai già un account? <a href="/">Accedi</a>
        </p>
      </div>
    </div>
    </>
  );
}
