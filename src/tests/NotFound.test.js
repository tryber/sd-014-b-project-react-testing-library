import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 4 - Testa o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('Verifica se a página com um h2 com o texto "Page requested not found 😭"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found');
  });
  test('Verifica se a página mostra a imagem do Pikachu tristinho', () => {
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAltText = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(imageAltText).toBeInTheDocument();
    expect(imageAltText.src).toStrictEqual(source);
  });
});
