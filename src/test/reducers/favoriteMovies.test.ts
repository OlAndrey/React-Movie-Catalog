import { clearFavoriteMovies, setFavoriteMovies, setFavoriteMoviesError, setLoadingFavoriteMovies } from '../../store/actions/favoriteMoviesAction';
import { favoriteMoviesReducers } from '../../store/reducers/favoriteMovies';
import { IMovies } from '../../types/movieList';

const movies: IMovies[] = [
  {
    backdropPath: '/h8gHn0OzBoaefsYseUByqsmEDMY.jpg',
    genreIds: [28, 53, 80],
    id: 603692,
    overview:
      'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
    posterPath: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    title: 'John Wick: Chapter 4',
    voteAverage: 7.9,
  },
];

describe('Favorite Movie List Reducer', () => {
  it('Should return a new state while there is data loading', () => {
    const action = setLoadingFavoriteMovies();
    const state = favoriteMoviesReducers(undefined, action);

    expect(state.isLoading).toEqual(true);
    expect(state.isError).toEqual(false);
  });

  it('Should return a new state if there are errors while loading data', () => {
    const action = setFavoriteMoviesError();
    const state = favoriteMoviesReducers(undefined, action);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(true);
  });

  it('Should return a new state if valid movies are provided', () => {
    const action = setFavoriteMovies(movies);
    const state = favoriteMoviesReducers(undefined, action);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.favoriteMovies).toEqual(movies);
  });

  it('Should clear favorite movie from state', () => {
    const action = clearFavoriteMovies();
    const state = favoriteMoviesReducers(undefined, action);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.favoriteMovies).toEqual([]);
  });
});
