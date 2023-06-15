import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Movie from '../../Components/Movie/Movie';

describe('Movie component', () => {
  it('Should render', () => {
    render(
      <Provider store={store}>
        <Movie />
      </Provider>
    );
    const linkElement = screen.getByText('No recommendations found!');
    expect(linkElement).toBeInTheDocument();
  });

});
