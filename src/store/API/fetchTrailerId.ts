import axios from '../../utils/axios';

export const fetchTrailerId = (movieId: string) => {
  return axios.get(`/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
};
