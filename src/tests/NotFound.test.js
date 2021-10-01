import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  it('Testa se tem um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    const emojiMaldito = screen.getByRole('img', {
      name: /crying emoji/i,
    });
    expect(h2).toBeInTheDocument();
    expect(emojiMaldito).toBeInTheDocument();
  });
  it('Testa se mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif ', () => {
    renderWithRouter(<NotFound />);
    const imagem = screen.getAllByRole('img');
    const imagemSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imagem[1].src).toBe(imagemSRC);
  });
});
