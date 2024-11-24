import axios from "axios";

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmQ0YWIxN2E4MjIyNTljOTc2MjAwNzYxOTg1ZDhkNCIsIm5iZiI6MTczMjQ2MTM2OC4wMjc3NjksInN1YiI6IjY3NDM0MGZjY2ZkMjRjM2E3YWFiNjZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HH-Rxh0zxNnWK7kH6ekSIJzI_vt6NXuf7DW7-kgLKKQ";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

axios.defaults.headers.common["Authorization"] = API_KEY;

export const fetchTrendMovies = async () => {
  const { data } = await axios.get("/trending/movie/week");
  return data.results;
};

export const fetchSingleMovie = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

export const fetchCast = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};

export const searchMovie = async (query) => {
  const { data } = await axios.get("/search/movie", {
    params: {
      query,
    },
  });
  return data.results;
};
