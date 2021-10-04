import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonNameId = 'pokemon-name';
    const pokemonTypeId = 'pokemon-type';
    const pokemonWeightID = 'pokemon-weight';
    const pokemonName = screen.getByTestId(pokemonNameId);
    const pokemonType = screen.getByTestId(pokemonTypeId);
    const pokemonWeight = screen.getByTestId(pokemonWeightID);
    const pokemonImg = screen.getByRole('img');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  const detailsButton = 'More details';
  const patch = '/pokemons/25';

  it('O card do Pokémon indicado na Pokédex possui link de navegação ', () => {
    renderWithRouter(<App />);
    const pokemonsDetails = screen.getByText(detailsButton);
    expect(pokemonsDetails).toBeInTheDocument();
    expect(pokemonsDetails).toHaveAttribute('href', patch);
  });

  it('Teste se ao clicar no link, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonsDetails = screen.getByText(detailsButton);
    userEvent.click(pokemonsDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(patch);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokemonsDetails = screen.getByText('More details');
    userEvent.click(pokemonsDetails);

    const favoritePokemonCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoritePokemonCheckbox);

    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
