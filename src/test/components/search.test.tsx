import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from '../../Components/Search/search';
import { Provider } from 'react-redux';
import { store } from '../../store';
import userEvent from '@testing-library/user-event';

const onSubmit = jest.fn();

describe('Search component', () => {
  it('Should render', () => {
    render(
      <Provider store={store}>
        <Search onSubmit={onSubmit} />
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  });

  it('Should enter text', () => {
    render(
      <Provider store={store}>
        <Search onSubmit={onSubmit} />
      </Provider>
    );

    const text = 'Cartman'
    const element = screen.getByRole('textbox')
    userEvent.type(element, text)
    expect(element).toHaveValue(text)

    userEvent.type(element, '{enter}')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0]).toEqual({
        search: text
    })
  });
});
