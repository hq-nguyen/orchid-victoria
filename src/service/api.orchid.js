import fetchData from "../config/axios";
import { getCategoryById } from "./api.category";

export const fetchOrchids = () => fetchData('/orchid');
export const fetchOrchidById = (id) => fetchData(`/orchid/${id}`);

export const fetchOrchidsWithCategory = async (id) => {
  try {
    const orchid = await fetchData(`/orchid/${id}`);

    if (orchid && orchid.categoryId) {
      const category = await getCategoryById(orchid.categoryId);

      return {
        ...orchid,
        category: category || null,  
      };
    }

    return orchid;
  } catch (error) {
    console.error("Error fetching orchid with category:", error);
    throw error;
  }
};

export const fetchOrchidsWithCategories = async () => {
  try {
    const orchids = await fetchData('/orchid');

    const orchidsWithCategories = await Promise.all(
      orchids.map(async (orchid) => {
        if (orchid.categoryId) {
          try {
            const category = await fetchData(`/categories/${orchid.categoryId}`);
            return {
              ...orchid,
              category
            };
          } catch (categoryError) {
            console.warn(`Could not fetch category for orchid ${orchid.id}:`, categoryError);
            return orchid;
          }
        }
        return orchid;
      })
    );

    return orchidsWithCategories;
  } catch (error) {
    console.error("Error fetching orchids with categories:", error);
    throw error;
  }
};


export const fetchOrchidsByCategory = (categoryId) => {
  return fetchData(`/orchid?categoryId=${categoryId}`);
}
  

export const searchOrchids = (query) =>
  fetchData(`/orchid?q=${query}`);

export const createOrchid = (data) => fetchData('/orchid', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const updateOrchid = (id, data) => fetchData(`/orchid/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});
export const deleteOrchid = (id) => fetchData(`/orchid/${id}`, {
  method: 'DELETE',
});



