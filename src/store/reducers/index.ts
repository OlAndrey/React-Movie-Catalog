import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
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
  form: formReducer,
});

export type AppStatetype = ReturnType<typeof rootReducer>;
