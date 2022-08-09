export interface IFavoriteMoviesState {
    isLoading: boolean
    isError: boolean
    favoriteMovies: string[]
}


export enum FavoriteMoviesActionsTypes {
	FETCH_FAVORITE_MOVIES = 'FETCH_FAVORITE_MOVIES',
	UPDATE_FAVORITE_MOVIES = 'UPDATE_FAVORITE_MOVIES',
    CLEAR_FAVORITE_MOVIES = 'CLEAR_FAVORITE_MOVIES',
	UPDATE_IS_FAVORITE_MOVIES_ERROR = 'UPDATE_IS_FAVORITE_MOVIES_ERROR',
}

interface FetchFavoriteMovies {
	type: FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES
}

interface UpdateFavoriteMovies {
	type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES,
	payload: string[],
}

interface ClearFavoriteMovies {
	type: FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES,
	payload: string[],
}

interface UpdateIsFavoriteMoviesError {
	type: FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR,
}

export type FavoriteMoviesActionType =
	FetchFavoriteMovies
	| UpdateFavoriteMovies
    | ClearFavoriteMovies
	| UpdateIsFavoriteMoviesError