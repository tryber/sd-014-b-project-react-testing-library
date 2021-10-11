import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import { NotFound } from '../components';

describe('Testa a funcionalidade do componente Not Found', () => {
  it('verifica heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('verifica endereço da imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const img = screen.getByRole('img', { name: altText });
    expect(img.src).toContain(imgNotFound);
  });
});
