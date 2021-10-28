import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
  });
  test('O peso médio do pokémon', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });
  test('O tipo correto do pokémon', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
  });

  test('A imagem do Pokémon possui o alt e o src corretos', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card indicado contém um link com detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByText('More details');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const checkFavourite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkFavourite);

    const starImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
