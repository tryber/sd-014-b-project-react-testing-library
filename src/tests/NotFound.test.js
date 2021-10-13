import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('Testa se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: 'Page requested not found Crying emoji' });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
