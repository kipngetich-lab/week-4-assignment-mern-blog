import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const PostForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const isEdit = !!id;
  const { post, loading, error, createPost, updatePost, fetchPost } = useContext(PostContext);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category?._id || '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePost(id, formData);
        history.push(`/posts/${id}`);
      } else {
        await createPost(formData);
        history.push('/posts');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;