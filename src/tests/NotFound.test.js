import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Req4: Testing component <NotFound.js />', () => {
  test('if page renders "Page requested not found 😭" header', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('if page renders NotFound image', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getAllByRole('img');
    expect(notFoundImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
