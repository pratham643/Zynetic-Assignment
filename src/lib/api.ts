import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://zynetic-backend1.vercel.app/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: any) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};
