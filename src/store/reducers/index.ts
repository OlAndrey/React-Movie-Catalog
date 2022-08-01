import { combineReducers } from 'redux';
import { movieListReducers } from './movieListReducers';

export const rootReducer = combineReducers({
    movieList: movieListReducers,
});

export type AppStatetype = ReturnType<typeof rootReducer>;