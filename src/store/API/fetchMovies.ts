import axios from '../../utils/axios';

export const fetchRecomends = (page = 1) => {
  return axios.get(
    `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  );
};

export const fetchSelectMovieDetails = (id: number) => {
  return axios.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
};

export const fetchMoviesWithGenre = (genreId: number, page: number) => {
  return axios.get(
    `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=6&with_genres=${genreId}&page=${page}`
  );
};

export const fetchSearchMovies = (query: string) => {
  return axios.get(
    `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&include_adult=false`
  );
};
