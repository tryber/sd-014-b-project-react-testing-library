import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Requisito 02', () => {
  test(
    'Se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);
      const title = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });

      expect(title).toBeInTheDocument();
    },
  );

  test(
    'se a página contém a imagem de Pikachu chorando',
    () => {
      render(<NotFound />);
      const picture = screen.getAllByRole('img');
      expect(picture[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
