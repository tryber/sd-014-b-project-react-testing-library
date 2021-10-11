import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound', () => {
  test('Pagina tem um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundMsg = screen.getByRole('heading', { level: 2 });
    expect(notFoundMsg).toHaveTextContent('Page requested not found');
  });
  test('Pagina tem imagem do Pikachu"', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByAltText(/Pikachu crying because the page/);
    expect(notFoundImg).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
