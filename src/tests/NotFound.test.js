import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const heading = screen.getByRole('heading', {
        level: 2,
        name: (/Page requested not found/i),
      });
      expect(heading).toBeInTheDocument();
    });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
