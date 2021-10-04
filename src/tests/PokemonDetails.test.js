import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa a aplicação do component Pokemon', () => {
  const MORE_DETAILS = 'More details';
  test('se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link',
      { name: MORE_DETAILS });
    userEvent.click(moreDetails);

    const pikachu = pokemons[0];
    const namePokemon = screen.getByRole('heading',
      { level: 2, name: `${pikachu.name} Details` });
    expect(namePokemon).toBeInTheDocument();

    const textPokemon = screen
      .getByText(/This intelligent Pokémon roasts hard berries with/);
    expect(textPokemon).toBeInTheDocument();
  });

  test('se existe na página os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link',
      { name: MORE_DETAILS });
    userEvent.click(moreDetails);

    const pikachu = pokemons[0];

    const title = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${pikachu.name}` });
    expect(title).toBeInTheDocument();

    const summary = screen.getByRole('heading',
      { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const mapaLocationOne = screen.getAllByRole('img')[1];
    expect(mapaLocationOne).toBeInTheDocument();
    expect(mapaLocationOne).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapaLocationOne).toHaveAttribute('alt', 'Pikachu location');

    const mapaLocationTwo = screen.getAllByRole('img')[2];
    expect(mapaLocationTwo).toBeInTheDocument();
    expect(mapaLocationTwo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapaLocationTwo).toHaveAttribute('alt', 'Pikachu location');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link',
      { name: 'More details' });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
