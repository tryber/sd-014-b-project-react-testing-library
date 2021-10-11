import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const titleNotFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(titleNotFound).toBeInTheDocument();
  });
  test('se a página contém uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const imagemNotFound = screen.getByAltText('Pikachu crying because the '
    + 'page requested was not found');
    expect(imagemNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
