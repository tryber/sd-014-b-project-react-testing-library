import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

const MEW = '/pokemons/151';

describe('PokemonDetails.js testcase', () => {
  test(`se as informações detalhadas do 
  Pokémon selecionado são mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(MEW);

    const details = screen.getByRole('heading', {
      level: 2,
      name: 'Mew Details',
    });
    const mewLore = screen.getByText(/pure of heart/i);
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(mewLore).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });

  test(`se existe na página uma seção 
  com os mapas contendo as localizações do pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(MEW);

    const locations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Mew',
    });
    expect(locations).toBeInTheDocument();

    const farawayisland = screen.getByText('Faraway Island');
    expect(farawayisland).toBeInTheDocument();

    const pokemonLocationImage = screen.getByAltText('Mew location');
    expect(pokemonLocationImage).toBeInTheDocument();

    expect(pokemonLocationImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    );
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(MEW);

    const checkFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeTruthy();
  });
});
