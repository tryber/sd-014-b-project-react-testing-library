import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const LINK_DETAILS = 'More details';

  test(`Teste se é renderizado um card com as informações
    de determinado pokémon`, () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const linkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(linkDetails).toBeInTheDocument('More details');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
    exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(linkDetails);
    const pathPokemonDetails = history.location.pathname;

    expect(pathPokemonDetails).toBe('/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o
    redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(linkDetails);

    const detailsPagePokemon = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(detailsPagePokemon).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: LINK_DETAILS });
    userEvent.click(linkDetails);
    const pokemonCheckFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    userEvent.click(pokemonCheckFavorite);
    const pokemonFavoriteCheck = screen.getByAltText('Pikachu is marked as favorite');

    expect(pokemonFavoriteCheck).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavoriteCheck).toBeInTheDocument();
  });
});
