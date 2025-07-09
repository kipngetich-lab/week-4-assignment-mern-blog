import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/posts/PostCard';
import CategoryList from '../../components/CategoryList';
import Loader from '../../components/Loader';
import SearchBar from '../../components/search/SearchBar';
import PostPagination from '../../components/posts/PostPagination';
import { getPosts } from '../../services/api';
import usePagination from '../../hooks/usePagination';

const PostList = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pagination, updatePagination, setTotal } = usePagination();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(location.search);
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchParams.get('search'),
          category: searchParams.get('category')
        };
        
        const [postsData, categoriesData] = await Promise.all([
          getPosts(params),
          getCategories()
        ]);
        
        setPosts(postsData.data);
        setCategories(categoriesData);
        setTotal(postsData.total || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, pagination.page, pagination.limit, setTotal]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar initialValue={new URLSearchParams(location.search).get('search') || ''} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
              <PostPagination
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.limit)}
                onPageChange={(page) => updatePagination({ page })}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 py-12">No posts found</p>
          )}
        </div>
        <div>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default PostList;