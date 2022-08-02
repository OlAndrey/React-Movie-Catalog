import { combineReducers } from 'redux';
import { authReducer } from './authReducers';
import { movieListReducers } from './movieListReducers';
import { trailerReducers } from './trailerReducers';

export const rootReducer = combineReducers({
    auth: authReducer,
    movieList: movieListReducers,
    trailer: trailerReducers
});

export type AppStatetype = ReturnType<typeof rootReducer>;