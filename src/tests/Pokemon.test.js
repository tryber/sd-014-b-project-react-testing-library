import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokémon.js/>', () => {
  it('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card contém um link para exibir mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkToPokemonDetails = screen.getByText('More details');
    expect(linkToPokemonDetails).toBeInTheDocument();

    userEvent.click(linkToPokemonDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se há uma estrela no pokemon favoritado', () => {
    renderWithRouter(<App />);

    const linkToPokemonDetails = screen.getByText('More details');
    expect(linkToPokemonDetails).toBeInTheDocument();
    userEvent.click(linkToPokemonDetails);

    const labelForFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(labelForFavoritePokemon).toBeInTheDocument();
    userEvent.click(labelForFavoritePokemon);

    const labelStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(labelStar).toBeInTheDocument();
    expect(labelStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
