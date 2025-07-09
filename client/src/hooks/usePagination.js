import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const usePagination = (initialPage = 1, initialLimit = 10) => {
  const location = useLocation();
  const history = useHistory();
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || initialPage;
    const limit = parseInt(searchParams.get('limit')) || initialLimit;
    
    setPagination(prev => ({
      ...prev,
      page,
      limit
    }));
  }, [location.search, initialPage, initialLimit]);

  const updatePagination = (newValues) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newValues.page || pagination.page);
    if (newValues.limit) {
      searchParams.set('limit', newValues.limit);
    }
    history.push({
      search: searchParams.toString()
    });
  };

  const setTotal = (total) => {
    setPagination(prev => ({
      ...prev,
      total
    }));
  };

  return {
    pagination,
    updatePagination,
    setTotal
  };
};

export default usePagination;