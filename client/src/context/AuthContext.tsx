import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/user/me');
          setUser(res.data);
        } catch (err) {
          console.error('Errore nel recupero utente:', err);
          logout(); 
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    setToken(token);
    setTimeout(()=>navigate('/dashboard'), 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
