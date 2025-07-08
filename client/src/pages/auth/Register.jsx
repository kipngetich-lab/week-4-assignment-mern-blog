// Register.jsx
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { register, error } = useContext(AuthContext);
  const history = useHistory();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      history.push('/posts');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="text-red-500">{error}</div>
            </div>
          </div>
        )}
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;