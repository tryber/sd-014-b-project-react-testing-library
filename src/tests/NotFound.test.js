import React from 'react';
import { screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import NotFound from '../components/NotFound';

describe('este o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderRouter(<NotFound />);
  });
  test('Página contém um heading h2 com o texto Page requested not found', () => {
    const heading = screen.getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra determinada  imagem', () => {
    const image = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
