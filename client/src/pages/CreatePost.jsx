import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { createPost, getCategories } from '../services/api';
import Loader from '../components/Loader';

const CreatePost = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createPost(formData);
      history.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreatePost;