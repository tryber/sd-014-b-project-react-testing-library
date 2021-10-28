import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';

const POKEMON_URL = '/pokemons/4';

describe('6. Testes do Pokemon.js', () => {
  it('Se renderiza um card com info de um determinado pokémon', () => {
    renderWithRouter(<App />);

    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireBtn);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Charmander sprite');

    expect(pokemonName.textContent).toBe('Charmander');
    expect(pokemonType.textContent).toBe('Fire');
    expect(pokemonWeight.textContent).toBe('Average weight: 8.5 kg');
    expect(pokemonImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  it('Se o card tem link para mais detalhes', () => {
    renderWithRouter(<App />);
    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireBtn);

    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toHaveAttribute('href', POKEMON_URL);
  });

  it('Se redireciona para detalhes do pokémos ao clicar no link do card', () => {
    const { history } = renderWithRouter(<App />);
    const fireBtn = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireBtn);

    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    expect(history.location.pathname).toBe(POKEMON_URL);
  });

  it('Se existe ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(POKEMON_URL);

    const favPokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favPokemon).toBeInTheDocument();
    userEvent.click(favPokemon);

    const favStar = screen.getByAltText('Charmander is marked as favorite');
    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
