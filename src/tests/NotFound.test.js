import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente Not Found', () => {
  test('se a página contém heading h2 com o texto `Page requested not found 😭`', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getAllByRole('img');
    expect(notFoundImg[1]).toBeInTheDocument();
    expect(notFoundImg[1]).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg[1]).toHaveAttribute('alt',
      'Pikachu crying because the page requested was not found');
  });
});
