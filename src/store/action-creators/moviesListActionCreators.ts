import { Dispatch } from 'react';
import { IMovies, IPopular, MoviesActionsTypes, MoviesActionType } from "../../types/movieList";
import { fetchMoviesWithGenre, fetchRecomends } from '../API/fetchMovies';

export const fetchRecomensList = () => {
	const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
		dispatch({
			type: MoviesActionsTypes.FETCH_MOVIES,
		})

		try {
			const dataFromServer = await fetchRecomends()
			dispatch({
				type: MoviesActionsTypes.UPDATE_MOVIES,
				payload: filterMovies(dataFromServer.data.results),
			})
		} catch (error) {
			console.error(`Can't proceed fetch movie list, ${error}`)

			dispatch({
				type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
			})
		}
	}

	return thunk;
}

export const fetchMovieList = (genreId: number) => {
	const thunk = async (dispatch: Dispatch<MoviesActionType>) => {
		dispatch({
			type: MoviesActionsTypes.FETCH_MOVIES,
		})

		try {
			const dataFromServer = await fetchMoviesWithGenre(genreId)

			dispatch({
				type: MoviesActionsTypes.UPDATE_MOVIES,
				payload: filterMovies(dataFromServer.data.results),
			})
		} catch (error) {
			console.error(`Can't proceed fetch movie list, ${error}`)

			dispatch({
				type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
			})
		}
	}

	return thunk;
}

const filterMovies = (data: IPopular[]): IMovies[] => {
    const result: IMovies[] = [];
    data.map(movie => (
      result.push({
        backdropPath: movie.backdrop_path,
        posterPath: movie.poster_path,
        id: movie.id,
        genreIds: movie.genre_ids.slice(0, 3),
        title: movie.title,
        voteAverage: movie.vote_average,
        overview: movie.overview
      })
    ));
  
    return result;
};