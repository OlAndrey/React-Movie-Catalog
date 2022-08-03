export interface IPopular {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}
  
export interface IMovies {
    backdropPath: string,
    posterPath: string,
    id: number,
    genreIds: number[],
    title: string,
    voteAverage: number,
    overview: string
}

export interface IMoviesState {
    isLoading: boolean,
    isError: boolean,
    movies: IMovies[],
    selectMovie: ICurent | null
}

export interface ICurent {
    backdrop_path: string,
    id: number,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    runtime: number,
    tagline: string,
    genres: {id: number, name: string}[],
    homepage: string,
}

export enum MoviesActionsTypes {
	FETCH_MOVIES = 'FETCH_MOVIES',
	UPDATE_MOVIES = 'UPDATE_MOVIES',
	SELECT_MOVIE = 'SELECT_MOVIE',
	UPDATE_IS_MOVIES_ERROR = 'UPDATE_IS_MOVIES_ERROR',
}

interface FetchMovie {
	type: MoviesActionsTypes.FETCH_MOVIES
}

interface UpdateMovie {
	type: MoviesActionsTypes.UPDATE_MOVIES,
	payload: IMovies[],
}

interface SelectMovie {
	type: MoviesActionsTypes.SELECT_MOVIE,
	payload: ICurent,
}

interface UpdateIsMovieError {
	type: MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR,
}

export type MoviesActionType =
	FetchMovie
	| UpdateMovie
    | SelectMovie
	| UpdateIsMovieError