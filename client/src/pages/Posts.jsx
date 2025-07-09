import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Posts = () => {
  const { posts, loading, error } = useContext(PostContext);

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;