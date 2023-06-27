import React from 'react';
import { render, screen } from '@testing-library/react';
import FourOFour from '../../Components/Page404/Page404';

describe('404 component', () => {
  it('Should render', () => {
    render(<FourOFour />);
    const linkElement = screen.getByText(/page not found/i);
    expect(linkElement).toBeInTheDocument();
  });
});
