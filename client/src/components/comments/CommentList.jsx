import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { deleteComment } from '../../services/api';

const CommentList = ({ comments, postId, onCommentDeleted }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (commentId) => {
    setLoading(true);
    try {
      await deleteComment(postId, commentId);
      onCommentDeleted(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{comment.author.name}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                {user && user._id === comment.author._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-800">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;