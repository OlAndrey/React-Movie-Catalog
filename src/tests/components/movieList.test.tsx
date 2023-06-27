import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MovieList from '../../Components/MovieList/MovieList';
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

describe('Movie List component', () => {
  it('Should render without movies', () => {
    render(
      <Provider store={store}>
        <MovieList movies={[]} />
      </Provider>
    );
    const linkElement = screen.queryByRole('heading');
    expect(linkElement).toBeNull();
  });

  it('Should render with movies', () => {
    render(
      <Provider store={store}>
        <MovieList movies={movies} />
      </Provider>
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    const title = screen.getAllByText(/John Wick/i);
    expect(title[0]).toBeInTheDocument();
  });
});
