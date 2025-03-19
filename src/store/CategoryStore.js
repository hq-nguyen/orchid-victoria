import { create } from 'zustand';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../services/api';

const useCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const categories = await getCategories();
      set({ categories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchCategoryById: async (id) => {
    try {
      set({ loading: true, error: null });
      const category = await getCategoryById(id);
      set({ selectedCategory: category, loading: false });
      return category;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  addCategory: async (categoryData) => {
    try {
      set({ loading: true, error: null });
      const newCategory = await createCategory(categoryData);
      set((state) => ({ 
        categories: [...state.categories, newCategory],
        loading: false 
      }));
      return newCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  updateCategory: async (id, categoryData) => {
    try {
      set({ loading: true, error: null });
      const updatedCategory = await updateCategory(id, categoryData);
      set((state) => ({ 
        categories: state.categories.map(c => c.id === id ? updatedCategory : c),
        selectedCategory: state.selectedCategory?.id === id ? updatedCategory : state.selectedCategory,
        loading: false 
      }));
      return updatedCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
  
  removeCategory: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteCategory(id);
      set((state) => ({ 
        categories: state.categories.filter(c => c.id !== id),
        selectedCategory: state.selectedCategory?.id === id ? null : state.selectedCategory,
        loading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  }
}));

export default useCategoryStore;