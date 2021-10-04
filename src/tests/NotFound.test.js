import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando a notFound', () => {
  test('Testa se a página exibe um h2 com Page request not found', () => {
    render(<NotFound />);
    const notFoundPage = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundPage).toBeInTheDocument();
  });

  test('Testa se a imagem é exibida', () => {
    render(<NotFound />);
    const pokemonImage = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(pokemonImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
