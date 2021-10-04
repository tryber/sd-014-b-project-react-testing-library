import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test(`se as informações detalhadas do Pokémon
   selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'More details' }));

    const h2Pikachu = screen.getByText('Pikachu Details');

    expect(h2Pikachu).toBeInTheDocument();
  });
});
