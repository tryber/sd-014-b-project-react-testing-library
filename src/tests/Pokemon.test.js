import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
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

  test(`Se o card do Pokémon indicado na Pokédex contém um link
  de navegação para exibir detalhes deste Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const checkPokemon = screen.getByRole('checkbox');
    userEvent.click(checkPokemon);
    const stared = screen.getByAltText('Pikachu is marked as favorite');
    expect(stared).toHaveAttribute('src', '/star-icon.svg');
  });
});
