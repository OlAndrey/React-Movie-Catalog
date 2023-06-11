import { setLoadingRecomends, setRecomendsError, updateRecomendsList } from '../../store/actions/recommendationMoviesAction';
import { recommendationMovieListReducers } from '../../store/reducers/recommendationReducers';
import { filterMovies } from '../../helpers/helpersFunctions';
import { IPopular } from '../../types/movieList';

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

describe('Recommendation Movie List Reducer', () => {
  it('Should return a new state while there is data loading', () => {
    const action = setLoadingRecomends();
    const state = recommendationMovieListReducers(undefined, action);

    expect(state.isLoading).toEqual(true);
    expect(state.isError).toEqual(false);
  });

  it('Should return a new state if there are errors while loading data', () => {
    const action = setRecomendsError();
    const state = recommendationMovieListReducers(undefined, action);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(true);
  });

  it('Should return a new state if valid movies are provided', () => {
    const action = updateRecomendsList(movies);
    const state = recommendationMovieListReducers(undefined, action);
    const response = filterMovies(movies);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.recommendMovies).toEqual(response);
  });
});
