import fetchData from "../config/axios";

export const getCategories = () => fetchData('/categories');
export const getCategoryById = (id) => fetchData(`/categories/${id}`);
export const createCategory = (data) => fetchData('/categories', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateCategory = (id, data) => fetchData(`/categories/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteCategory = (id) => fetchData(`/categories/${id}`, {
  method: 'DELETE',
});
