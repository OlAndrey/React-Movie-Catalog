import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../Components/Footer/Footer';

describe('Footer component', () => {
  it('Should render', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Make with love by Oleynik!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
