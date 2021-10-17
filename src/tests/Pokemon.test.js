import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componenete <Pokemon />', () => {
  it('Testa se é renderizado um card com as informações de um pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Testa o atributo alt e src', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonImg.alt).toBe(`${pokemons[0].name} sprite`);
    expect(pokemonImg.src).toBe(src);
  });

  it('Testa se há um link para <PokemonDetails />', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');

    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Testa o link para <PokemonDetails />', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const checkPokemons = screen.getByRole('checkbox');
    userEvent.click(checkPokemons);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    const src = 'http://localhost/star-icon.svg';
    expect(favoritePokemon).toHaveProperty('src', src);
  });
});
