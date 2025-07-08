import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { posts, loading, error, deletePost } = useContext(PostContext);

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Dashboard</h2>
        <Link to="/posts/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} onDelete={deletePost} editable />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;