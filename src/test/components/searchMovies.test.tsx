import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchMovies from '../../Components/SearchMovies/SearchMovies';
import { Provider } from 'react-redux';
import { store } from '../../store';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({movieName : 'Thor'}),
}));

describe('Search Movies component', () => {
  it('Should render', () => {
    render(
      <Provider store={store}>
        <SearchMovies />
      </Provider>
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/Thor/i)).toBeInTheDocument();
  });

  it('Should render with movies', async() => {
    render(
      <Provider store={store}>
        <SearchMovies />
      </Provider>
    );
    
    const resultsLinks = await screen.findAllByRole('link');
    expect(resultsLinks).toHaveLength(40);
    const title = await screen.findAllByRole('heading');
    expect(title).toHaveLength(25);
  });
});
