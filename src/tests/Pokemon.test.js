import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Verifica o componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const pikachuImage = screen.getByRole('img');
      expect(pikachuImage).toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
});
