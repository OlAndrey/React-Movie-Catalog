import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../../Components/Loader/Loader';

describe('Loading component', () => {
  it('Should render', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('lds-container');
  });
});
