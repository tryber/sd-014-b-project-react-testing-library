import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from './services/renderWithRouter';

describe('', () => {
  it('', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found');
  });

  it('', () => {
    renderWithRouter(<NotFound />);

    const pikachuGif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(pikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
