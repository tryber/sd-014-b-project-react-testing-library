import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pikachuBtn = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(pikachuBtn);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`se existe o link e se ao clicar no link de navegação do Pokémon, é feito 
  o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);

    const checkFavoritePokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(checkFavoritePokemon);

    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
