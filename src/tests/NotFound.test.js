import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Componente NotFound', () => {
  it('Teste se página contém o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const imageNotFound = screen.getByAltText(/Pikachu crying/i);
    expect(imageNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
