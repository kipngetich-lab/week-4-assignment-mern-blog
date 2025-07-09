import { Link } from 'react-router-dom';  // Add this import
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/posts';

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      history.replace(from);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="text-red-500">{error}</div>
            </div>
          </div>
        )}
        <LoginForm onSubmit={handleLogin} />
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;