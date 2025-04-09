import './navbar.css';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>TodoApp</h1>
      {user && (
        <div className="navbar-right">
          <span>{user.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export {};
