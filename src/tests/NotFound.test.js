import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './RenderWithRouter';

beforeEach(() => renderWithRouter(<NotFound />));

describe('Testa o componente NotFound', () => {
  test('Verifica se página contém um heading h2 com o texto "Page requested not found"',
    () => {
      const textNotFound = screen.getByText(/Page requested not found/);
      expect(textNotFound).toBeInTheDocument();
    });

  test('verifica se a página contém a iamgem', () => {
    const image = screen.getByAltText(/Pikachu crying because/);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
