import { Dispatch } from 'react';
import { filterMovies } from '../../helpers/helpersFunctions';
import { RecommendMoviesActionsTypes, RecommendMoviesActionType } from '../../types/recommendation';
import { fetchRecommendationById } from '../API/fetchRecomendation';

export const fetchRecommendationListById = (id: string) => {
	const thunk = async (dispatch: Dispatch<RecommendMoviesActionType>) => {
		dispatch({
			type: RecommendMoviesActionsTypes.FETCH_RECOMENDS_MOVIES,
		})

		try {
			const dataFromServer = await fetchRecommendationById(id)
			dispatch({
				type: RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES,
				payload: filterMovies(dataFromServer.data.results),
			})
		} catch (error) {
			console.error(`Can't proceed fetch recommendation movie list, ${error}`)
 
			dispatch({
				type: RecommendMoviesActionsTypes.UPDATE_IS_RECOMENDS_MOVIES_ERROR,
			})
		}
	}

	return thunk;
}

