import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Movie from '../../Components/Movie/Movie';

const mock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => mock(),
}));

describe('Movie component', () => {
  it('Should render the component when the movie is not found', async () => {
    mock.mockImplementation(() => ({ id: undefined }));

    render(
      <Provider store={store}>
        <Movie />
      </Provider>
    );

    const linkElement = await screen.findByText(/No movie found/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/John Wick/i)).toBeNull();
  });

  it('Should render the component when a movie is found', async () => {
    mock.mockImplementation(() => ({ id: 603692 }));

    const testMock = mock();

    render(
      <Provider store={store}>
        <Movie />
      </Provider>
    );

    expect(testMock.id).toEqual(603692);

    const movieName = await screen.findAllByText(/John Wick/i);
    expect(movieName[0]).toBeInTheDocument();
    const heads = await screen.findAllByRole('heading');
    expect(heads).toHaveLength(3);
  });
});
