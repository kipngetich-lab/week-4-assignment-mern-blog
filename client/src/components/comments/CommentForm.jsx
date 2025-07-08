import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setLoading(true);
    try {
      await onCommentAdded(postId, content);
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
            alt={user?.name}
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows="2"
            className="input-field w-full"
            disabled={!user}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!content.trim() || loading || !user}
              className="btn btn-primary px-4 py-1 text-sm"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;