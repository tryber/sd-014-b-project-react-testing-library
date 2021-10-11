import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderwithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<NotFound />);
    const infos = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found / });
    expect(infos).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
