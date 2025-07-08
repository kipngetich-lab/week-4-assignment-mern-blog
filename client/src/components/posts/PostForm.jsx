import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getCategories } from '../../services/api';
import Loader from '../Loader';

const PostForm = ({ initialData = {}, onSubmit, loading }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

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

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed().when('_id', {
      is: (id) => !id,
      then: Yup.mixed().required('Image is required')
    })
  });

  if (categoriesLoading) return <Loader />;

  return (
    <Formik
      initialValues={{
        title: initialData.title || '',
        content: initialData.content || '',
        category: initialData.category?._id || '',
        image: null
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields implementation */}
        </form>
      )}
    </Formik>
  );
};

export default PostForm;