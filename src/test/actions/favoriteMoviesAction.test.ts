import {
  clearFavoriteMovies,
  setFavoriteMovies,
  setFavoriteMoviesError,
  setLoadingFavoriteMovies,
} from '../../store/actions/favoriteMoviesAction';
import { FavoriteMoviesActionsTypes } from '../../types/favoriteMovies';
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

describe('Get Favorite Movies', () => {
  it('Should return an object that contains an action to display the loading of favorite movies', () => {
    const response = setLoadingFavoriteMovies();

    expect(response.type).toEqual(FavoriteMoviesActionsTypes.FETCH_FAVORITE_MOVIES);
  });

  it('Should return an object that contains an action to display an error on favorite movies', () => {
    const response = setFavoriteMoviesError();

    expect(response.type).toEqual(FavoriteMoviesActionsTypes.UPDATE_IS_FAVORITE_MOVIES_ERROR);
  });

  it('Should return an object containing the action and payload with the favorite movies', () => {
    interface UpdateFavoriteMovies {
      type: FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES;
      payload: IMovies[];
    }

    const response = setFavoriteMovies(movies) as UpdateFavoriteMovies;

    expect(response.type).toEqual(FavoriteMoviesActionsTypes.UPDATE_FAVORITE_MOVIES);
    expect(response.payload).toEqual(movies);
  });

  it('Should return an object containing an action and a payload with a clean list of favorite movies', () => {
    interface ClearFavoriteMovies {
      type: FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES;
      payload: IMovies[];
    }

    const response = clearFavoriteMovies() as ClearFavoriteMovies;

    expect(response.type).toEqual(FavoriteMoviesActionsTypes.CLEAR_FAVORITE_MOVIES);
    expect(response.payload).toEqual([]);
  });
});
