import fetchData from "../config/axios";


export const fetchOrchids = () => fetchData('/orchid');
export const fetchOrchidById = (id) => fetchData(`/orchid/${id}`);
export const fetchOrchidsByCategory = async (categoryId) => {
  const orchids = await fetchOrchids();
  return orchids.filter(orchid => orchid.categoryId === categoryId);
};
export const searchOrchids = async (query) => {
  const orchids = await fetchOrchids();
  return orchids.filter(orchid => 
    orchid.name.toLowerCase().includes(query.toLowerCase())
  );
};
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



