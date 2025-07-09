import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPenAlt, FaSearch, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to MERN Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A full-stack blog application built with MongoDB, Express, React, and Node.js
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaSearch className="mx-auto h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Posts</h3>
            <p className="text-gray-500 mb-4">
              Discover interesting articles from our community
            </p>
            <Link 
              to="/posts" 
              className="btn btn-primary inline-block"
            >
              Explore
            </Link>
          </div>

          {!isAuthenticated && (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaUserPlus className="mx-auto h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Join Us</h3>
                <p className="text-gray-500 mb-4">
                  Create an account to start interacting
                </p>
                <Link
                  to="/register"
                  className="btn bg-green-600 hover:bg-green-700 text-white inline-block"
                >
                  Register
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaPenAlt className="mx-auto h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Get Started</h3>
                <p className="text-gray-500 mb-4">
                  Already have an account? Sign in now
                </p>
                <Link
                  to="/login"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white inline-block"
                >
                  Login
                </Link>
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow col-span-2">
              <FaPenAlt className="mx-auto h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create Content</h3>
              <p className="text-gray-500 mb-4">
                Start sharing your knowledge with the community
              </p>
              <Link
                to="/posts/create"
                className="btn btn-primary inline-block"
              >
                Create Post
              </Link>
            </div>
          )}
        </div>

        {/* Additional CTA for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to join our community?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg"
              >
                <FaUserPlus className="mr-2" />
                Sign Up Now
              </Link>
              <Link
                to="/login"
                className="btn bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg"
              >
                Login to Your Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;