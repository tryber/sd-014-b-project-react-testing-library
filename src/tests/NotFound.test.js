import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('Verifica se tem um heading ', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();

    const img = screen.getByAltText(/Pikachu crying because/i);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
