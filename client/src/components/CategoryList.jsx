import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <ul className="space-y-2">
        <li>
          <Link
            to="/posts"
            className={`block px-3 py-2 rounded-md ${!currentCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            All Categories
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`/posts?category=${category._id}`}
              className={`block px-3 py-2 rounded-md ${currentCategory === category._id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;