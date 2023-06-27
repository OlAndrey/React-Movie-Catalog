import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../store';
import Search from '../../Components/Search/Search';

const onSubmit = jest.fn();

describe('Search component', () => {
  it('Should render', () => {
    render(
      <Provider store={store}>
        <Search onSubmit={onSubmit} />
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('Should enter text', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Search onSubmit={onSubmit} />
      </Provider>
    );

    const text = 'Cartman';
    const textbox = screen.getByRole('textbox');
    await user.type(textbox, text);
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveValue(text);

    await user.type(textbox, '{enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      search: text,
    });
  });
});
