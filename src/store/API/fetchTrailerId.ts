import axios from 'axios';

const apiKey: String = 'b35f53caccfa4398c708083960012136';

export const fetchTrailerId = (movieId: string) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
};
