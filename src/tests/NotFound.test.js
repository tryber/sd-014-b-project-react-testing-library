import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';

describe('Testes do componente <NotFound.js />', () => {
  it('A página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const headingMsg = screen.getByRole('heading', { level: 2 });
    expect(headingMsg.textContent).toBe('Page requested not found 😭');
  });

  it('A página mostra a imagem do Pikachu', () => {
    renderWithRouter(<NotFound />);
    const imgPikachu = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
