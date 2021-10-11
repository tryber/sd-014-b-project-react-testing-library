import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Req 4 - Testa o componente "NotFound"', () => {
  it('Deve renderizar um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const notFoundMessage = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Deve renderizar uma imagem ', () => {
    renderWithRouter(<NotFound />);

    const notFoundImagem = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(notFoundImagem).toBeInTheDocument();
    expect(notFoundImagem).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
