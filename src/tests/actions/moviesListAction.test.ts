import {
  setGenreTypeById,
  setLoadingMoviesData,
  setLoadingUpdateMoviesData,
  setMovies,
  setMoviesError,
  setSearchMovies,
  updateMovies,
} from '../../store/actions/moviesListAction';
import { IMovies, IPopular, MoviesActionsTypes } from '../../types/movieList';

interface Movies {
  payload: IMovies[];
  currentPage?: number;
  totalPages?: number;
}

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

const resMovies: IMovies[] = [
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

describe('Get Movie List', () => {
  it('Should return an object that contains an action to display the loading of movie list', () => {
    const response = setLoadingMoviesData();

    expect(response.type).toEqual(MoviesActionsTypes.FETCH_MOVIES);
  });

  it('Should return an object that contains an action to display the loading of update movie list', () => {
    const response = setLoadingUpdateMoviesData();

    expect(response.type).toEqual(MoviesActionsTypes.FETCH_FOR_UPDATE_MOVIES);
  });

  it('Should return an object that contains an action to display an error on movie list', () => {
    const response = setMoviesError();

    expect(response.type).toEqual(MoviesActionsTypes.UPDATE_IS_MOVIES_ERROR);
  });

  it('Should return an object containing the action and payload with the movie list', () => {
    interface SetMovies extends Movies {
      type: MoviesActionsTypes.SET_MOVIES;
    }

    const pageNum = 1;
    const totalPages = 10;
    const response = setMovies(movies, pageNum, totalPages) as SetMovies;

    expect(response.type).toEqual(MoviesActionsTypes.SET_MOVIES);
    expect(response.payload).toEqual(resMovies);
    expect(response.currentPage).toEqual(pageNum);
    expect(response.totalPages).toEqual(totalPages);
  });

  it('Should return an object that contains the action and payload with the updated movie list', () => {
    interface UpdateMovies extends Movies {
      type: MoviesActionsTypes.UPDATE_MOVIES;
    }

    const pageNum = 1;
    const totalPages = 10;
    const response = updateMovies(movies, pageNum, totalPages) as UpdateMovies;

    expect(response.type).toEqual(MoviesActionsTypes.UPDATE_MOVIES);
    expect(response.payload).toEqual(resMovies);
    expect(response.currentPage).toEqual(pageNum);
    expect(response.totalPages).toEqual(totalPages);
  });

  it('Should return an object that contains an action and a payload with a list of search movies', () => {
    interface SetSearchMovies extends Movies {
      type: MoviesActionsTypes.SET_SEARCH_MOVIES;
    }
    const response = setSearchMovies(movies) as SetSearchMovies;

    expect(response.type).toEqual(MoviesActionsTypes.SET_SEARCH_MOVIES);
    expect(response.payload).toEqual(resMovies);
  });

  it('Must return an object containing an action and a payload with a genre type identifier.', () => {
    interface SetByGenreTypeId {
      type: MoviesActionsTypes.SET_BY_GENRE_TYPE_ID;
      payload: string;
    }

    const genreTypeId = '1';
    const response = setGenreTypeById(genreTypeId) as SetByGenreTypeId;

    expect(response.type).toEqual(MoviesActionsTypes.SET_BY_GENRE_TYPE_ID);
    expect(response.payload).toEqual(genreTypeId);
  });
});
