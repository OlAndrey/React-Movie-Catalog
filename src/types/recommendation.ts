import { IMovies } from './movieList';

export interface IRecommendMoviesState {
  isLoading: boolean;
  isError: boolean;
  recommendMovies: IMovies[];
}

export enum RecommendMoviesActionsTypes {
  FETCH_RECOMENDS_MOVIES = 'FETCH_RECOMENDS_MOVIES',
  UPDATE_RECOMENDS_MOVIES = 'UPDATE_RECOMENDS_MOVIES',
  UPDATE_IS_RECOMENDS_MOVIES_ERROR = 'UPDATE_IS_RECOMENDS_MOVIES_ERROR',
}

interface FetchRecommend {
  type: RecommendMoviesActionsTypes.FETCH_RECOMENDS_MOVIES;
}

interface UpdateRecommend {
  type: RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES;
  payload: IMovies[];
}

interface UpdateIsRecommendError {
  type: RecommendMoviesActionsTypes.UPDATE_IS_RECOMENDS_MOVIES_ERROR;
}

export type RecommendMoviesActionType = FetchRecommend | UpdateRecommend | UpdateIsRecommendError;
