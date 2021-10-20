import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 4: Teste o componente <NotFound.js />', () => {
  test('Teste com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  test('mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const notFoundSrc = notFoundImg.getAttribute('src');
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundSrc).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
