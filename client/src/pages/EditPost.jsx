import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { getPost, updatePost, getCategories } from '../services/api';
import Loader from '../components/Loader';

const EditPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, categoriesData] = await Promise.all([
          getPost(id),
          getCategories(),
        ]);
        setPost(postData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updatePost(id, formData);
      history.push(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <Loader />;

  if (!post) return <div className="text-center py-12">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditPost;