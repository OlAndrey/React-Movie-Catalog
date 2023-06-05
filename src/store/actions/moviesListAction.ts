import { filterMovie, filterMovies } from '../../helpers/helpersFunctions';
import { ICurent, IPopular, MoviesActionType, MoviesActionsTypes } from '../../types/movieList';

export const setLoadingMoviesData = (): MoviesActionType => ({
  type: MoviesActionsTypes.FETCH_MOVIES,
});

export const setLoadingUpdateMoviesData = (): MoviesActionType => ({
  type: MoviesActionsTypes.FETCH_FOR_UPDATE_MOVIES,
});

export const setMoviesError = (): MoviesActionType => ({
  type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
});

export const setMovies = (data: IPopular[], page: number, total_pages: number): MoviesActionType => ({
  type: MoviesActionsTypes.SET_MOVIES,
  payload: filterMovies(data),
  currentPage: page,
  totalPages: total_pages,
});

export const updateMovies = (data: IPopular[], page: number, total_pages: number): MoviesActionType => ({
  type: MoviesActionsTypes.UPDATE_MOVIES,
  payload: filterMovies(data),
  currentPage: page,
  totalPages: total_pages,
});

export const setSearchMovies = (movies: IPopular[]): MoviesActionType => ({
  type: MoviesActionsTypes.SET_SEARCH_MOVIES,
  payload: filterMovies(movies),
})

export const setGenreTypeById = (id: string): MoviesActionType => ({
  type: MoviesActionsTypes.SET_BY_GENRE_TYPE_ID,
  payload: id,
});

export const selectMovie = (movieData: ICurent): MoviesActionType => ({
  type: MoviesActionsTypes.SELECT_MOVIE,
  payload: filterMovie(movieData),
})