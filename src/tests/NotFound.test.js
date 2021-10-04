import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing the NotFound.js component', () => {
  it('should contain a h2 heading with the text "Page requested not found 😭"',
    () => {
      render(<NotFound />);

      const notFound = screen.getByText(/Page requested not found/i);

      expect(notFound).toBeInTheDocument();
    });

  it('should render the img https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      render(<NotFound />);

      const allImg = screen.getAllByRole('img');

      expect(allImg[1]).toHaveAttribute(
        'src',
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
    });
});
