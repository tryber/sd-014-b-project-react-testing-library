import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { level: 2,
      name: 'Page requested not found Crying emoji' });

    expect(title).toBeInTheDocument();
  });

  test('Testa o src da imagem', () => {
    renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(altText);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
