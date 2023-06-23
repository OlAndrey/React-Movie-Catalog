import axios from '../../utils/axios';

export const fetchRecommendationById = (id: string) => {
  return axios.get(`/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`);
};
