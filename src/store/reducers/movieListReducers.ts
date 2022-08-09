import { IMoviesState, MoviesActionsTypes, MoviesActionType } from "../../types/movieList";

const initState: IMoviesState = {
    isLoading: true,
    isLoadingUpdate: false,
    isError: false,
    byGenreTypeId: '0',
    currentPage: 0,
    totalPages: 0,
    movies: [],
    searchMovies: [],
    selectMovie: null
}

export const movieListReducers = (state: IMoviesState = initState, action: MoviesActionType): IMoviesState => {
	switch (action.type) {
		case MoviesActionsTypes.FETCH_MOVIES:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        
		case MoviesActionsTypes.FETCH_FOR_UPDATE_MOVIES:
            return {
                ...state,
                isLoadingUpdate: true,
                isError: false
            }
        
        case MoviesActionsTypes.SET_MOVIES:
            return {
                ...state,
                isLoading: false,
                isLoadingUpdate: false,
                isError: false,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
                movies: action.payload
            }

        case MoviesActionsTypes.UPDATE_MOVIES:
            return {
                ...state,
                isLoading: false,
                isLoadingUpdate: false,
                isError: false,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
                movies: state.movies.concat(action.payload)
            }
        
        case MoviesActionsTypes.SET_SEARCH_MOVIES:
            return {
                ...state,
                isLoading: false,
                isError: false,
                searchMovies: action.payload
            }
            
        case MoviesActionsTypes.SET_BY_GENRE_TYPE_ID:
            return {
                ...state,
                byGenreTypeId: action.payload
            }

        case MoviesActionsTypes.SELECT_MOVIE:
            return {
                ...state,
                isLoading: false,
                isError: false,
                selectMovie: action.payload
            }
        
		case MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            
        default: 
            return state
    }
}