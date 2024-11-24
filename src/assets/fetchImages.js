import axios from "axios";

export const fetchImages = async ({ query, page = 1 }) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: "Vj0rezvtge_8JdgBMtHWU0yiZz0LDvj8OcdmmhT3Rvo",
      per_page: 12,
      orientation: "landscape",
      query,
      page,
    },
  });

  return response.data;
};
