import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(header).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem...', () => {
    renderWithRouter(<NotFound />);

    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(/pikachu crying/i);
    expect(image.src).toBe(imgSrc);
  });
});
