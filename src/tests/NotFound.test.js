import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente NotFound.js', () => {
  test('se página contém um heading h2 com o texto "Page requested not found 😭".',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/rota-maraviliosa-que-por-algum-motivo-desconhecido-não-existe');
      const heading = screen.getByText(/Page requested not found/i);

      expect(heading).toBeInTheDocument();
    });

  test('se página mostra a imagem maraviliosa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-maraviliosa-que-por-algum-motivo-desconhecido-não-existe');

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
