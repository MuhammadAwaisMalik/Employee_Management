const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return apiUrl;
};

export default getBaseUrl;
