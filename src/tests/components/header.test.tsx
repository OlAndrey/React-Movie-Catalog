import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Header from '../../Components/Header/Header';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Header component', () => {
  it('Should render', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const linkElement = screen.getByText(/movie catalog/i);
    expect(linkElement).toBeInTheDocument();
  });
});
