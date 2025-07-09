import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Posts API
export const getPosts = (params = {}) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => {
  const formData = new FormData();
  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });
  return api.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Categories API
export const getCategories = () => api.get('/categories');
export const getCategory = (id) => api.get(`/categories/${id}`);
//comments
// Add this to your services/api.js file, with the other API functions
export const deleteComment = (postId, commentId) => 
  api.delete(`/posts/${postId}/comments/${commentId}`);
  // Add to your services/api.js (with the other API functions)
export const getComments = (postId) => api.get(`/posts/${postId}/comments`);
// Add to services/api.js (with other comment functions)
export const addComment = (postId, commentData) => 
  api.post(`/posts/${postId}/comments`, commentData);