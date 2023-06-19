import { Dispatch } from 'redux';
import { MoviesActionType } from '../../types/movieList';
import {
  fetchMoviesWithGenre,
  fetchRecomends,
  fetchSearchMovies,
  fetchSelectMovieDetails,
} from '../API/fetchMovies';
import {
  selectMovie,
  setGenreTypeById,
  setLoadingMoviesData,
  setLoadingUpdateMoviesData,
  setMovies,
  setMoviesError,
  setSearchMovies,
  updateMovies,
} from '../actions/moviesListAction';

export const fetchRecomensList = () => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch(setLoadingMoviesData());

    try {
      const dataFromServer = await fetchRecomends();
      const { results, page, total_pages } = dataFromServer.data;
      dispatch(setMovies(results, page, total_pages));
      dispatch(setGenreTypeById('0'));
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch(setMoviesError());
    }
  };

  return thunk;
};

export const updateRecomensList = (pageNumber: number) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch(setLoadingUpdateMoviesData());

    try {
      const dataFromServer = await fetchRecomends(pageNumber);
      const { results, page, total_pages } = dataFromServer.data;
      dispatch(updateMovies(results, page, total_pages));
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch(setMoviesError());
    }
  };

  return thunk;
};

export const setSearchList = (name: string) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch(setLoadingMoviesData());

    try {
      const dataFromServer = await fetchSearchMovies(name);
      dispatch(setSearchMovies(dataFromServer.data.results));
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch(setMoviesError());
    }
  };

  return thunk;
};

export const setSelectMovie = (id: number) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch(setLoadingMoviesData());

    try {
      const dataFromServer = await fetchSelectMovieDetails(id);
      dispatch(selectMovie(dataFromServer.data));
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch(setMoviesError());
    }
  };

  return thunk;
};

export const fetchMovieList = (genreId: number, pageNum = 1) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch(setLoadingUpdateMoviesData());

    try {
      const dataFromServer = await fetchMoviesWithGenre(genreId, pageNum);
      const { results, page, total_pages } = dataFromServer.data;
      if (page === 1) {
        dispatch(setMovies(results, page, total_pages));
        dispatch(setGenreTypeById(String(genreId)));
      } else dispatch(updateMovies(results, page, total_pages));
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch(setMoviesError());
    }
  };

  return thunk;
};
