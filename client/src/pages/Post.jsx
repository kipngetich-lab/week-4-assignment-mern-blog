import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Post = () => {
  const { id } = useParams();
  const { post, loading, error, fetchPost } = useContext(PostContext);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
          {post.category && (
            <span className="ml-4 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {post.category.name}
            </span>
          )}
        </div>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;