import { combineReducers } from 'redux';
import { authReducer } from './authReducers';
import { movieListReducers } from './movieListReducers';

export const rootReducer = combineReducers({
    auth: authReducer,
    movieList: movieListReducers,
});

export type AppStatetype = ReturnType<typeof rootReducer>;