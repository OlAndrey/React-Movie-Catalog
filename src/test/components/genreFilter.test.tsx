import React from 'react';
import { render, screen } from '@testing-library/react';
import GenreFilter from '../../Components/GenreFilter/GenreFilter';

const changeFilter = jest.fn()

describe('GenreFilter component', () => {
  it('Should render', () => {
    render(<GenreFilter changeFilter={changeFilter} />);
    const linkElement = screen.getByRole('combobox');
    expect(linkElement).toBeInTheDocument();
  });
});