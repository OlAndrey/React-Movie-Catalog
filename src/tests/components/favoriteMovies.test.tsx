import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FavoriteMovies from '../../Components/FavoriteMovies/FavoriteMovies';
import { auth } from '../../firebase';

const mockStore = configureMockStore();

const userData = signInWithEmailAndPassword(auth, 'fortest1@test.com', 'Qwertytrewq1');

describe('Favorite Movies component', () => {
  it('Should render the component when there is no list of favorite movies', () => {
    const mockState = {
      favoriteMovies: {
        isLoading: false,
        isError: false,
        favoriteMovies: [],
      },
    };
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <FavoriteMovies />
      </Provider>
    );

    const linkElement = screen.getByText(/favorite movies is empty/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/John Wick/i)).toBeNull();
    const heads = screen.getAllByRole('heading');
    expect(heads).toHaveLength(2);
  });

  it('Should render component when favorite movie list is there', () => {
    const mockState = {
      favoriteMovies: {
        isLoading: false,
        isError: false,
        favoriteMovies: [
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
      },
      auth: {
        currentUser: (async function () {
          return await userData;
        })(),
      },
    };
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <FavoriteMovies />
      </Provider>
    );

    const movieName = screen.getAllByText(/John Wick/i);
    expect(movieName[0]).toBeInTheDocument();
    const heads = screen.getAllByRole('heading');
    expect(heads).toHaveLength(2);
  });
});
