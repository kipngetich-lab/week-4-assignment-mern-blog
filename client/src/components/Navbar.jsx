import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container flex justify-between items-center py-3">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <FaHome className="mr-2" />
          MERN Blog
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/posts" className="flex items-center hover:underline">
            <FaList className="mr-1" /> Posts
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center hover:underline">
                <FaUser className="mr-1" /> Dashboard
              </Link>
              <button onClick={logout} className="flex items-center hover:underline">
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center hover:underline">
              <FaSignInAlt className="mr-1" /> Login
            </Link>
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;