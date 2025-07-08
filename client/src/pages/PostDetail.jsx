import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../services/api';
import Loader from '../components/Loader';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loader />;

  if (!post) return <div className="text-center py-12">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>
            Posted on {new Date(post.createdAt).toLocaleDateString()} in{' '}
            <span className="text-blue-600">{post.category?.name}</span>
          </span>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link
            to={`/posts/${post._id}/edit`}
            className="btn btn-primary mr-2"
          >
            Edit
          </Link>
          <Link to="/posts" className="btn bg-gray-600 text-white hover:bg-gray-700">
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;