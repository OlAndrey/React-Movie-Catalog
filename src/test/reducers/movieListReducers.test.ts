import { filterMovie, filterMovies } from '../../helpers/helpersFunctions';
import {
  selectMovie,
  setGenreTypeById,
  setLoadingMoviesData,
  setLoadingUpdateMoviesData,
  setMovies,
  setMoviesError,
  setSearchMovies,
  updateMovies,
} from '../../store/actions/moviesListAction';
import { movieListReducers } from '../../store/reducers/movieListReducers';
import { ICurent, IPopular } from '../../types/movieList';

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

describe('Movie List Reducer', () => {
  it('Should return a new state while there is data loading', () => {
    const action = setLoadingMoviesData();
    const state = movieListReducers(undefined, action);

    expect(state.isLoading).toEqual(true);
    expect(state.isError).toEqual(false);
  });

  it('Should return a new state while there is a load of updated data', () => {
    const action = setLoadingUpdateMoviesData();
    const state = movieListReducers(undefined, action);

    expect(state.isLoadingUpdate).toEqual(true);
    expect(state.isError).toEqual(false);
  });

  it('Should return a new state if there are errors while loading data', () => {
    const action = setMoviesError();
    const state = movieListReducers(undefined, action);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(true);
  });

  it('Should return a new state if valid movies are provided, as well as the current page and total number of pages', () => {
    const pageNum = 1;
    const totalPages = 10;
    const action = setMovies(movies, pageNum, totalPages);
    const state = movieListReducers(undefined, action);
    const response = filterMovies(movies);

    expect(state.isLoading).toEqual(false);
    expect(state.isLoadingUpdate).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.currentPage).toEqual(pageNum);
    expect(state.totalPages).toEqual(totalPages);
    expect(state.movies).toEqual(response);
  });

  it('Should return an updated state if valid movies are provided, as well as the current page and total pages', () => {
    const pageNum = 2;
    const totalPages = 10;
    const action = updateMovies(movies, pageNum, totalPages);
    const state = movieListReducers(undefined, action);
    const response = filterMovies(movies);

    expect(state.isLoading).toEqual(false);
    expect(state.isLoadingUpdate).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.currentPage).toEqual(pageNum);
    expect(state.totalPages).toEqual(totalPages);
    expect(state.movies).toEqual(response);
  });

  it('Should return a new state if valid search movies are provided', () => {
    const action = setSearchMovies(movies);
    const state = movieListReducers(undefined, action);
    const response = filterMovies(movies);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.searchMovies).toEqual(response);
  });

  it('Should return new state with trailer ID', () => {
    const genreTypeId = '1';
    const action = setGenreTypeById(genreTypeId);
    const state = movieListReducers(undefined, action);

    expect(state.byGenreTypeId).toEqual(genreTypeId);
  });

  it('Should return new state if a valid movie is provided', () => {
    const movie: ICurent = {
      backdrop_path: '/h8gHn0OzBoaefsYseUByqsmEDMY.jpg',
      id: 603692,
      overview:
        'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
      poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
      release_date: '2023-03-22',
      title: 'John Wick: Chapter 4',
      vote_average: 7.9,
      runtime: 170,
      tagline: 'No way back, one way out.',
      genres: [
        { id: 28, name: 'Action' },
        { id: 53, name: 'Thriller' },
        { id: 80, name: 'Crime' },
      ],
      homepage: 'https://johnwick.movie',
    };

    const action = selectMovie(movie);
    const state = movieListReducers(undefined, action);
    const response = filterMovie(movie);

    expect(state.isLoading).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.selectMovie).toEqual(response);
  });
});
