import './navbar.css';

interface NavbarProps {
  user: { name: string };
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  console.log('NAVBAR user:', user);
  return (
    <nav className="navbar">
      <h1>TodoApp</h1>
      {user && (
        <div className="navbar-right">
          <span>Ciao{user.name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
