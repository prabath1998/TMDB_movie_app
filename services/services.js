import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=0b22772c0a7b5f9604f2cf1eef2af55a';

// Get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return response.data.results;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

// Get popular tv series
export const getPopularTv = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

// Get family tv series
export const getFamilyMovies = async () => {
  const response = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
  return response.data.results;
};


// Get documentary movies
export const getDocumentaryMovies = async () => {
  const response = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=99`);
  return response.data.results;
};

// Get movieDetails
export const getMovie = async (id) => {
  const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return response.data;
};