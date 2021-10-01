import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste NotFFound', () => {
  it('Verifica a h2 e imagem', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();

    const gif = screen.getByAltText(/Pikachu crying/);
    expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
