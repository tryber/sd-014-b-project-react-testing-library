import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa o componente NotFound.js', () => {
  test('se página contém um heading h2 com o texto "Page requested not found 😭".',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/non-existing-route');
      // push adiciona uma rota desejada para análise
      const notFoundText = screen.getByRole('heading',
        { level: 2, name: 'Page requested not found Crying emoji' });

      expect(notFoundText).toBeInTheDocument();
    });

  test('se página exibe o gid de not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/non-existing-route');

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
