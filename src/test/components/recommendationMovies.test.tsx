import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import RecommendationMovies from '../../Components/RecommendationMovies/RecommendationMovies';

const mockedFetchRecomensList = jest.fn(() => ({ type: 'test' }));
const mockedFetchMovieList = jest.fn(() => ({ type: 'test' }));
const mockedUpdateRecomensList = jest.fn(() => ({ type: 'test' }));

jest.mock('../../store/thunk-creators/moviesListThunkCreators', () => ({
  fetchRecomensList: () => mockedFetchRecomensList(),
  fetchMovieList: () => mockedFetchMovieList(),
  updateRecomensList: () => mockedUpdateRecomensList(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const movieList = {
  isLoading: false,
  isLoadingUpdate: false,
  isError: false,
  byGenreTypeId: '0',
  currentPage: 0,
  totalPages: 0,
  movies: [],
};

describe('Recommendation Movies component', () => {
  it('Should render the component when there is no movie list', () => {
    mockedFetchRecomensList.mockImplementation(() => ({ type: 'test' }));

    const store = mockStore({
      movieList,
    });

    render(
      <Provider store={store}>
        <RecommendationMovies />
      </Provider>
    );

    expect(screen.getByText(/Movies not found/i)).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(mockedFetchRecomensList).toHaveBeenCalledTimes(1);
  });

  it('Should render the component when there is a list of movies', () => {
    mockedFetchRecomensList.mockImplementation(() => ({ type: 'test' }));

    const mockState = {
      movieList: Object.assign({}, movieList, {
        movies: [
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
        ],
      }),
      favoriteMovies: {
        isLoading: false,
        isError: false,
        favoriteMovies: [],
      },
      auth: {
        isCheck: false,
        isCheckAuth: true,
        isError: false,
        currentUser: null,
      },
    };
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <RecommendationMovies />
      </Provider>
    );

    expect(screen.getAllByText(/John Wick/i)[0]).toBeInTheDocument();
    expect(mockedFetchRecomensList).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });
});
