import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing if <NotFound /> is rendering the correct information', () => {
  it('should render a <h2> with the text "Page requested not found 😭"',
    () => {
      render(<NotFound />);

      const notFound = screen.getByText(/Page requested not found/i);

      expect(notFound).toBeInTheDocument();
    });

  it('should render https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      render(<NotFound />);

      const notFoundImg = screen.getAllByRole('img');

      expect(notFoundImg[1]).toHaveAttribute(
        'src',
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
    });
});
