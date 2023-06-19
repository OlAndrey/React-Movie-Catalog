import { Dispatch } from 'redux';
import { RecommendMoviesActionType } from '../../types/recommendation';
import { fetchRecommendationById } from '../API/fetchRecomendation';
import {
  setLoadingRecomends,
  setRecomendsError,
  updateRecomendsList,
} from '../actions/recommendationMoviesAction';

export const fetchRecommendationListById = (id: string) => {
  const thunk = async (dispatch: Dispatch<RecommendMoviesActionType>) => {
    dispatch(setLoadingRecomends());

    try {
      const dataFromServer = await fetchRecommendationById(id);
      dispatch(updateRecomendsList(dataFromServer.data.results));
    } catch (error) {
      console.error(`Can't proceed fetch recommendation movie list, ${error}`);

      dispatch(setRecomendsError());
    }
  };

  return thunk;
};
