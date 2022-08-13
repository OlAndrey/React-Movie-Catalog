import {
  FavoriteMoviesActionsTypes,
  FavoriteMoviesActionType,
  IFavoriteMoviesState,
} from '../../types/favoriteMovies';

const initState: IFavoriteMoviesState = {
  isLoading: true,
  isError: false,
  favoriteMovies: [],
};

export const favoriteMoviesReducers = (
  state: IFavoriteMoviesState = initState,
  action: FavoriteMoviesActionType
): IFavoriteMoviesState => {
  switch (action.type) {
    case FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES:
      return {
        ...state,
        isLoading: false,
        isError: false,
        favoriteMovies: action.payload,
      };

    case FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES:
      return {
        ...state,
        isLoading: false,
        isError: false,
        favoriteMovies: action.payload,
      };

    case FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
