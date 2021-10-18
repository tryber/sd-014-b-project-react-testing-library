import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Componente NotFound', () => {
  it('Teste se página contém o texto "Page requested not found 😭"', () => {
    render(<NotFound />);
    const textNotFound = screen.getByTestId('not-found-text');
    expect(textNotFound).toHaveTextContent('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem correta', () => {
    render(<NotFound />);
    const imageNotFound = screen.getByTestId('not-found-image');
    expect(imageNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
