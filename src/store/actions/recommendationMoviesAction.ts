import { filterMovies } from '../../helpers/helpersFunctions';
import { IPopular } from '../../types/movieList';
import { RecommendMoviesActionsTypes, RecommendMoviesActionType } from '../../types/recommendation';

export const setLoadingRecomends = (): RecommendMoviesActionType => ({
  type: RecommendMoviesActionsTypes.FETCH_RECOMENDS_MOVIES,
});

export const setRecomendsError = (): RecommendMoviesActionType => ({
  type: RecommendMoviesActionsTypes.UPDATE_IS_RECOMENDS_MOVIES_ERROR,
});

export const updateRecomendsList = (movies: IPopular[]): RecommendMoviesActionType => ({
  type: RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES,
  payload: filterMovies(movies),
});
