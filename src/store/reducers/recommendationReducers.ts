import { IRecommendMoviesState, RecommendMoviesActionsTypes, RecommendMoviesActionType } from "../../types/recommendation";

const initState: IRecommendMoviesState = {
    isLoading: true,
    isError: false,
    recommendMovies: []
}

export const recommendationMovieListReducers = (state: IRecommendMoviesState = initState, action: RecommendMoviesActionType): IRecommendMoviesState => {
	switch (action.type) {
		case RecommendMoviesActionsTypes.FETCH_RECOMENDS_MOVIES:
            return {
                ...state,
                isLoading: true,
                isError: true
            }
        case RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES:
            return {
                isLoading: false,
                isError: true,
                recommendMovies: action.payload
            }
        
		case RecommendMoviesActionsTypes.UPDATE_IS_RECOMENDS_MOVIES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            
        default: 
            return state
    }
}