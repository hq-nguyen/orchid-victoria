import { create } from 'zustand';
import {
    createOrchid,
    deleteOrchid,
    fetchOrchidById,
    fetchOrchids,
    updateOrchid,
    searchOrchids, // Import searchOrchids
} from '../service/api.orchid';
import { addFeedback, deleteFeedback, updateFeedback } from '../service/api.feedback';

const useOrchidStore = create((set, get) => ({
    orchids: [],
    filteredOrchids: [],
    selectedOrchid: null,
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all',

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
            set({ loading: true, error: null, searchQuery: query }); // Set searchQuery immediately
            const orchids = await searchOrchids(query);

            // Filter the orchids array based on the search query
            const filteredOrchids = orchids.filter((orchid) =>
                orchid.name.toLowerCase().includes(query.toLowerCase())
            );

            set({
                orchids: orchids, // Keep all orchids in the orchids state
                filteredOrchids: filteredOrchids, // Update the filteredOrchids state with search results
                loading: false,
            });
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

    setSearchQuery: (query) => {
        set({ searchQuery: query });
    },
    setSelectedCategory: (categoryId) => {
        set({ selectedCategory: categoryId });
        get().applyFilters();
    },

    applyFilters: () => {
        const { orchids, searchQuery, selectedCategory } = get();
        let filtered = [...orchids];

        // Apply search filter (moved to fetchOrchids)

        // Apply category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((orchid) => orchid.categoryId === selectedCategory);
        }

        set({ filteredOrchids: filtered });
    },

    // Feedback methods
    addFeedback: async (orchidId, feedbackData) => {
        try {
            set({ loading: true, error: null });
            const updatedOrchid = await addFeedback(orchidId, feedbackData);
            set((state) => ({
                orchids: state.orchids.map((o) => (o.id === orchidId ? updatedOrchid : o)),
                selectedOrchid: state.selectedOrchid?.id === orchidId ? updatedOrchid : state.selectedOrchid,
                loading: false,
            }));
            return updatedOrchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateFeedback: async (orchidId, authorEmail, feedbackData) => {
        try {
            set({ loading: true, error: null });
            const updatedOrchid = await updateFeedback(orchidId, authorEmail, feedbackData);
            set((state) => ({
                orchids: state.orchids.map((o) => (o.id === orchidId ? updatedOrchid : o)),
                selectedOrchid: state.selectedOrchid?.id === orchidId ? updatedOrchid : state.selectedOrchid,
                loading: false,
            }));
            return updatedOrchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteFeedback: async (orchidId, authorEmail) => {
        try {
            set({ loading: true, error: null });
            const updatedOrchid = await deleteFeedback(orchidId, authorEmail);
            set((state) => ({
                orchids: state.orchids.map((o) => (o.id === orchidId ? updatedOrchid : o)),
                selectedOrchid: state.selectedOrchid?.id === orchidId ? updatedOrchid : state.selectedOrchid,
                loading: false,
            }));
            return updatedOrchid;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },
}));

export default useOrchidStore;
