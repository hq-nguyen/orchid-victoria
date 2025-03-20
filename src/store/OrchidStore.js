import { create } from 'zustand';
import {
    createOrchid,
    deleteOrchid,
    fetchOrchidById,
    fetchOrchids,
    updateOrchid,
    searchOrchids,
} from '../service/api.orchid';
import { getCategories } from '../service/api.category';

const useOrchidStore = create((set, get) => ({
    orchids: [],
    filteredOrchids: [],
    selectedOrchid: null,
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategories: [], // Changed from selectedCategory string to array
    selectedColors: [],
    selectedType: 'all',
    sortOption: 'featured',
    categories: [],

    // Centralized fetchOrchids with optional search query
    fetchOrchids: async () => {
        try {
            set({ loading: true, error: null });
            const orchids = await fetchOrchids();
            set({
                orchids,
                filteredOrchids: orchids,
                loading: false,
            });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    searchOrchidsAction: async (query) => {
        try {
            set({ loading: true, error: null, searchQuery: query });
            const orchids = await searchOrchids(query);
            set({
                orchids: orchids,
                filteredOrchids: orchids,
                loading: false,
            });
            get().applyFilters();
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchOrchidById: async (id) => {
        try {
            set({ loading: true, error: null });
            const orchid = await fetchOrchidById(id);
            set({ selectedOrchid: orchid, loading: false });
            return orchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    fetchCategories: async () => {
        try {
            set({ loading: true, error: null });
            const categories = await getCategories();
            set({
                categories,
                loading: false,
            });
            return categories;
        } catch (error) {
            set({ error: error.message, loading: false });
            return [];
        }
    },

    // CRUD operations for orchids
    addOrchid: async (orchidData) => {
        try {
            set({ loading: true, error: null });
            const newOrchid = await createOrchid(orchidData);
            set((state) => ({
                orchids: [...state.orchids, newOrchid],
                loading: false,
            }));
            get().applyFilters();
            return newOrchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateOrchid: async (id, orchidData) => {
        try {
            set({ loading: true, error: null });
            const updatedOrchid = await updateOrchid(id, orchidData);
            set((state) => ({
                orchids: state.orchids.map((o) => (o.id === id ? updatedOrchid : o)),
                selectedOrchid: state.selectedOrchid?.id === id ? updatedOrchid : state.selectedOrchid,
                loading: false,
            }));
            get().applyFilters();
            return updatedOrchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    removeOrchid: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteOrchid(id);
            set((state) => ({
                orchids: state.orchids.filter((o) => o.id !== id),
                selectedOrchid: state.selectedOrchid?.id === id ? null : state.selectedOrchid,
                loading: false,
            }));
            get().applyFilters();
            return true;
        } catch (error) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    // Filter setters
    setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().applyFilters();
    },

    setSelectedCategory: (categoryId) => {
        set((state) => {
            // If categoryId is an array, replace the entire selection
            if (Array.isArray(categoryId)) {
                return { selectedCategories: categoryId };
            }

            // Toggle the category in the array
            const currentCategories = [...state.selectedCategories];
            const index = currentCategories.indexOf(categoryId);

            if (index >= 0) {
                currentCategories.splice(index, 1);
            } else {
                currentCategories.push(categoryId);
            }

            return { selectedCategories: currentCategories };
        });
        get().applyFilters();
    },

    setSelectedColor: (color) => {
        set((state) => {
            const currentColors = [...state.selectedColors];
            const index = currentColors.indexOf(color);

            if (index >= 0) {
                currentColors.splice(index, 1);
            } else {
                currentColors.push(color);
            }

            return { selectedColors: currentColors };
        });
        get().applyFilters();
    },

    setOrchidType: (type) => {
        set({ selectedType: type });
        get().applyFilters();
    },

    setSortOption: (option) => {
        set({ sortOption: option });
        get().applyFilters();
    },

    // Sorting function
    applySorting: () => {
        const { filteredOrchids, sortOption } = get();
        let sorted = [...filteredOrchids];

        switch (sortOption) {
            case 'a-z':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'z-a':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'featured':
            default:
                // Keep original order for featured
                break;
        }
        set({ filteredOrchids: sorted });
    },

    // Fixed filtering function
    applyFilters: () => {
        const { orchids, searchQuery, selectedCategories, selectedColors, selectedType } = get();
        let filtered = [...orchids];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter((orchid) =>
                orchid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (orchid.description && orchid.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((orchid) =>
                orchid.categoryId && selectedCategories.includes(orchid.categoryId.toString())
            );
        }

        // Apply color filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter((orchid) => {
                if (!orchid.color) return false;

                // Handle color as a comma-separated string
                if (typeof orchid.color === 'string') {
                    const orchidColors = orchid.color.toLowerCase().split(',').map(c => c.trim());
                    return selectedColors.some(selectedColor =>
                        orchidColors.includes(selectedColor.toLowerCase())
                    );
                }

                // Handle color as an array
                if (Array.isArray(orchid.color)) {
                    return orchid.color.some(color =>
                        selectedColors.includes(color.toLowerCase())
                    );
                }

                return false;
            });
        }

        // Apply type filter
        if (selectedType && selectedType !== 'all') {
            if (selectedType === 'nature') {
                filtered = filtered.filter((orchid) => orchid.nature === true);
            } else if (selectedType === 'special') {
                filtered = filtered.filter((orchid) => orchid.special === true);
            }
        }

        set({ filteredOrchids: filtered });
        get().applySorting();
    },

    clearFiltersAndSorting: () => {
        set({
            searchQuery: '',
            selectedCategories: [],
            selectedColors: [],
            selectedType: 'all',
            sortOption: 'featured'
        });
        get().applyFilters();
    },
}));

export default useOrchidStore;