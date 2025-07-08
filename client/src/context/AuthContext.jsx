import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../services/auth';

// Create and export AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const loadUser = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = (userData) => {
    setUser(userData);
    setError(null);
    history.push('/posts');
  };

  const register = (userData) => {
    setUser(userData);
    setError(null);
    history.push('/posts');
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      history.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        loadUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};