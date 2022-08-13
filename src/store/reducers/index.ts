import { combineReducers } from 'redux';
import { authReducer } from './authReducers';
import { favoriteMoviesReducers } from './favoriteMovies';
import { movieListReducers } from './movieListReducers';
import { recommendationMovieListReducers } from './recommendationReducers';
import { trailerReducers } from './trailerReducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  movieList: movieListReducers,
  trailer: trailerReducers,
  recommendList: recommendationMovieListReducers,
  favoriteMovies: favoriteMoviesReducers,
});

export type AppStatetype = ReturnType<typeof rootReducer>;
