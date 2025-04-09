import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError('Email o password non validi');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit">Accedi</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="link">
          Non hai un account? <a href="/register">Registrati</a>
        </p>
      </div>
    </div>
  );
}
