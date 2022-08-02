import { IMoviesState, MoviesActionsTypes, MoviesActionType } from "../../types/movieList";

const initState: IMoviesState = {
    isLoading: true,
    isError: false,
    movies: []
}

export const movieListReducers = (state: IMoviesState = initState, action: MoviesActionType): IMoviesState => {
	switch (action.type) {
		case MoviesActionsTypes.FETCH_MOVIES:
            return {
                ...state,
                isLoading: true,
                isError: true
            }
        case MoviesActionsTypes.UPDATE_MOVIES:
            return {
                isLoading: false,
                isError: true,
                movies: action.payload
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