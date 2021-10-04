import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <NotFound.js>', () => {
  test('Verifica se página contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundMsg = screen.getByRole('heading', { level: 2 });
    expect(notFoundMsg).toHaveTextContent('Page requested not found');
  });
  test('Verifica se página contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img');
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
