import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Teste o componente NotFound', () => {
  test('se a página contém um heading h2 com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);

    const subtitle = screen.getByRole('heading',
      { level: 2 });

    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent('Page requested not found 😭');
  });

  test('se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
