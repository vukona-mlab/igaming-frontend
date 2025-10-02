// utils/filterBySearch.js
export const filterBySearch = (data, searchTerm) => {
  if (!searchTerm) return data;

  const searchLower = searchTerm.toLowerCase();
  return data.filter((item) => {
    return (
      (item.name && item.name.toLowerCase().includes(searchLower)) ||
      (item.displayName && item.displayName.toLowerCase().includes(searchLower)) ||
      (item.email && item.email.toLowerCase().includes(searchLower)) ||
      (item.jobTitle && item.jobTitle.toLowerCase().includes(searchLower))
    );
  });
};
