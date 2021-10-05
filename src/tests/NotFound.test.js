import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('', () => {
  test('', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: (/Page requested not found/i),
    });
    expect(heading).toBeInTheDocument();
  });
});
