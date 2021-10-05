import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <Pokemon.js>', () => {
  test('Verifica se é renderizado um card com detalhes do pokémon', () => {
    renderWithRouter(<App />);
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke).toHaveTextContent('Pikachu');
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke).toHaveTextContent('Electric');
    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke).toHaveTextContent(/Average weight/);
    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica a navegação do card', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const checkFavoritePokemon = screen.getByRole('checkbox');
    userEvent.click(checkFavoritePokemon);

    const favIconStar = screen.getByAltText(/Pikachu is marked/);
    expect(favIconStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
