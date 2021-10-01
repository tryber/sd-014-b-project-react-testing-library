import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações do Pokémon', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(resetButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se existe um link para exibir mais detalhes sobre o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(resetButton);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/10');

    const favoritedPokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritedPokemon).toBeInTheDocument();

    userEvent.click(favoritedPokemon);
    const favoriteIcon = screen.getByAltText('Caterpie is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toBeInTheDocument();
  });
});
