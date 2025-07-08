import api from './api';

const categoriesService = {
  getCategories: () => api.get('/categories'),
  createCategory: (data) => api.post('/categories', data),
};

export default categoriesService;