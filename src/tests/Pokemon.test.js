import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o card do Pokemon', () => {
  test('se o nome do pokemon é mostrado', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('se o peso é mostrado corretamente', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('se o tipo é mostrado corretamente', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  test('se a imagem possui o alt e o src corretos', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se a URL ao clicar no botão more details está correta', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByText('More details');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('se há uma estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const checkFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkFav);

    const starIcon = screen.getByAltText(/is marked as favorite/);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
