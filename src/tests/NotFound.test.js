import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa conteúdo da página NotFound', () => {
  test('Verifica h2 e imagem', () => {
    render(<NotFound />);
    const title = screen.getByText('Page requested not found');
    expect(title).toBeInTheDocument();

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
