import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getComments, addComment, deleteComment } from '../../services/api';
import Loader from '../../components/Loader';
import CommentForm from '../../components/comments/CommentForm';
import CommentList from '../../components/comments/CommentList';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async (postId, content) => {
    setCommentLoading(true);
    try {
      const newComment = await addComment(postId, { content });
      setComments([...comments, newComment]);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  if (loading) return <Loader />;

  if (!post) return <div className="text-center py-12">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.image && (
          <div className="h-64 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>Posted by {post.author?.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600">{post.category?.name}</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
        </div>
      </div>

      <CommentForm
        postId={post._id}
        onCommentAdded={handleAddComment}
        loading={commentLoading}
      />
      <CommentList
        comments={comments}
        postId={post._id}
        onCommentDeleted={handleDeleteComment}
      />
    </div>
  );
};

export default PostDetail;