import api from "../config/axios";

export const fetchOrchids = async () => {
    try {
        const response = await api.get("/orchid");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchOrchidById = async (id) => {
    try {
        const response = await api.get(`/orchid/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const createOrchid = async (orchidData) => {
    try {
        const response = await api.post("/orchid", orchidData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateOrchid = async (id, orchidData) => {
    try {
        const response = await api.put(`/orchid/${id}`, orchidData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteOrchid = async (id) => {
    try {
        const response = await api.delete(`/orchid/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};


