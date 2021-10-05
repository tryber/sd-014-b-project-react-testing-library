import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImg = screen.getByAltText(/sprite/);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o card do Pokémon indicado contém um link para detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const checkPokemon = screen.getByRole('checkbox');
    userEvent.click(checkPokemon);

    const favImgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
