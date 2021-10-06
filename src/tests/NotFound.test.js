import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 04', () => {
  it('Contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header.textContent).toBe('Page requested not found 😭');
  });
  it('Mostra a imagem do pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const cryPikachu = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(cryPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
