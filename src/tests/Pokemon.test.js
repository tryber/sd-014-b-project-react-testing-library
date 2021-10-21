import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const idNextPokemon = 'next-pokemon';
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByTestId(idNextPokemon);
    userEvent.click(nextPokemon);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Charmander');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Fire');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 8.5 kg');
    const pokemonImg = screen.getByAltText(/sprite/);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test(`Se o card do Pokémon indicado na Pokédex contém um link
  de navegação para exibir detalhes deste Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const nextPokemon = screen.getByTestId(idNextPokemon);
    userEvent.click(nextPokemon);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/4');
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByTestId(idNextPokemon);
    userEvent.click(nextPokemon);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const checkPokemon = screen.getByRole('checkbox');
    userEvent.click(checkPokemon);

    const stared = screen.getByAltText('Charmander is marked as favorite');
    expect(stared).toHaveAttribute('src', '/star-icon.svg');
  });
});
