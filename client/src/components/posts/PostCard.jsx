import { Link } from 'react-router-dom';
import { FaComment, FaUser } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FaUser className="mr-1" />
          <span>{post.author?.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600">{post.category?.name}</span>
          <div className="flex items-center text-gray-500">
            <FaComment className="mr-1" />
            <span>{post.commentCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;