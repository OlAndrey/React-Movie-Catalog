import { FavoriteMoviesActionsTypes, FavoriteMoviesActionType } from '../../types/favoriteMovies';
import { IMovies } from '../../types/movieList';

export const setLoadingFavoriteMovies = (): FavoriteMoviesActionType => ({
  type: FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES,
});

export const setFavoriteMoviesError = (): FavoriteMoviesActionType => ({
  type: FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR,
});

export const setFavoriteMovies = (favoriteMovies: IMovies[]): FavoriteMoviesActionType => ({
  type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES,
  payload: favoriteMovies,
});

export const clearFavoriteMovies = (): FavoriteMoviesActionType=> ({
  type: FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES,
  payload: [],
});
