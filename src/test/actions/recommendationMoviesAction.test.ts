import { filterMovies } from '../../helpers/helpersFunctions';
import {
  setLoadingRecomends,
  setRecomendsError,
  updateRecomendsList,
} from '../../store/actions/recommendationMoviesAction';
import { IMovies, IPopular } from '../../types/movieList';
import { RecommendMoviesActionsTypes } from '../../types/recommendation';

const movies: IPopular[] = [
  {
    adult: false,
    backdrop_path: '/h8gHn0OzBoaefsYseUByqsmEDMY.jpg',
    genre_ids: [28, 53, 80],
    id: 603692,
    original_language: 'en',
    original_title: 'John Wick: Chapter 4',
    overview:
      'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
    popularity: 4456.007,
    poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    release_date: '2023-03-22',
    title: 'John Wick: Chapter 4',
    video: false,
    vote_average: 7.9,
    vote_count: 2684,
  },
];

describe('Get Recommendation Movies', () => {
  it('Should return an object that contains an action to display the loading of favorite movies', () => {
    const response = setLoadingRecomends();

    expect(response.type).toEqual(RecommendMoviesActionsTypes.FETCH_RECOMENDS_MOVIES);
  });

  it('Should return an object that contains an action to display an error on favorite movies', () => {
    const response = setRecomendsError();

    expect(response.type).toEqual(RecommendMoviesActionsTypes.UPDATE_IS_RECOMENDS_MOVIES_ERROR);
  });

  it('Should return an object containing the action and payload with the favorite movies', () => {
    interface UpdateRecommend {
      type: RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES;
      payload: IMovies[];
    }

    const response = updateRecomendsList(movies) as UpdateRecommend;

    expect(response.type).toEqual(RecommendMoviesActionsTypes.UPDATE_RECOMENDS_MOVIES);
    expect(response.payload).toEqual(filterMovies(movies));
  });
});
