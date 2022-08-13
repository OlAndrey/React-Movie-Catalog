import { Dispatch } from 'redux';
import { filterMovies, filterMovie } from '../../helpers/helpersFunctions';
import { MoviesActionsTypes, MoviesActionType } from '../../types/movieList';
import {
  fetchMoviesWithGenre,
  fetchRecomends,
  fetchSearchMovies,
  fetchSelectMovieDetails,
} from '../API/fetchMovies';

export const fetchRecomensList = () => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch({
      type: MoviesActionsTypes.FETCH_MOVIES,
    });

    try {
      const dataFromServer = await fetchRecomends();
      dispatch({
        type: MoviesActionsTypes.SET_MOVIES,
        payload: filterMovies(dataFromServer.data.results),
        currentPage: dataFromServer.data.page,
        totalPages: dataFromServer.data.total_pages,
      });
      dispatch({
        type: MoviesActionsTypes.SET_BY_GENRE_TYPE_ID,
        payload: '0',
      });
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch({
        type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
      });
    }
  };

  return thunk;
};

export const updateRecomensList = (pageNumber: number) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch({
      type: MoviesActionsTypes.FETCH_FOR_UPDATE_MOVIES,
    });

    try {
      const dataFromServer = await fetchRecomends(pageNumber);
      dispatch({
        type: MoviesActionsTypes.UPDATE_MOVIES,
        payload: filterMovies(dataFromServer.data.results),
        currentPage: dataFromServer.data.page,
        totalPages: dataFromServer.data.total_pages,
      });
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch({
        type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
      });
    }
  };

  return thunk;
};

export const setSearchList = (name: string) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch({
      type: MoviesActionsTypes.FETCH_MOVIES,
    });

    try {
      const dataFromServer = await fetchSearchMovies(name);
      dispatch({
        type: MoviesActionsTypes.SET_SEARCH_MOVIES,
        payload: filterMovies(dataFromServer.data.results),
      });
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch({
        type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
      });
    }
  };

  return thunk;
};

export const setSelectMovie = (id: number) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch({
      type: MoviesActionsTypes.FETCH_MOVIES,
    });

    try {
      const dataFromServer = await fetchSelectMovieDetails(id);
      dispatch({
        type: MoviesActionsTypes.SELECT_MOVIE,
        payload: filterMovie(dataFromServer.data),
      });
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch({
        type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
      });
    }
  };

  return thunk;
};

export const fetchMovieList = (genreId: number, page = 1) => {
  const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
    dispatch({
      type: MoviesActionsTypes.FETCH_FOR_UPDATE_MOVIES,
    });

    try {
      const dataFromServer = await fetchMoviesWithGenre(genreId, page);
      if (page === 1) {
        dispatch({
          type: MoviesActionsTypes.SET_MOVIES,
          payload: filterMovies(dataFromServer.data.results),
          currentPage: dataFromServer.data.page,
          totalPages: dataFromServer.data.total_pages,
        });
        dispatch({
          type: MoviesActionsTypes.SET_BY_GENRE_TYPE_ID,
          payload: String(genreId),
        });
      } else
        dispatch({
          type: MoviesActionsTypes.UPDATE_MOVIES,
          payload: filterMovies(dataFromServer.data.results),
          currentPage: dataFromServer.data.page,
          totalPages: dataFromServer.data.total_pages,
        });
    } catch (error) {
      console.error(`Can't proceed fetch movie list, ${error}`);

      dispatch({
        type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
      });
    }
  };

  return thunk;
};
