import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';

describe('Requisito 5 - Teste o componente Pokedex', () => {
  test('se a página contém um h2 com o texto Encountered pokémons ', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });

    expect(subtitle).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon da lista quando é clicado', () => {
    renderWithRouter(<Pokedex />);
  });
});
