import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

beforeEach(() => renderWithRouter(<NotFound />));
// Se você tem algum trabalho
// que você precisa fazer repetidamente por
// muitos testes, você pode usar beforeEach e afterEach

describe('Testando componente NotFound', () => {
  test('se página contém um heading h2 com o texto "Page requested not found"', () => {
    const textoH2 = screen.getByText(/Page requested not found/);
    expect(textoH2).toBeInTheDocument();
  });

  test('se página contém a imagem"', () => {
    const imagem = screen.getByAltText(/Pikachu crying because/);
    expect(imagem).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
