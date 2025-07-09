import { Link, useHistory } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MERN Blog
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/posts"
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
          >
            <FaList />
            <span>Posts</span>
          </Link>
          {user ? (
            <>
              <Link
                to="/posts/create"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <FaPlus />
                <span>Create Post</span>
              </Link>
              <div className="flex items-center space-x-2 ml-4">
                <div className="flex items-center space-x-1">
                  <FaUser className="text-gray-700" />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;