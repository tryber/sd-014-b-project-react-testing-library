import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Renderiza card do pokemon com as infos', () => {
  test('Nome do pokemon renderiza na tela', () => {
    renderWithRouter(<App />);
    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon.textContent).toBe('Pikachu');
  });

  test('Tipo do pokemon é renderizado na tela', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');
  });

  test('Peso do pokemon é renderizado na tela', () => {
    renderWithRouter(<App />);
    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon.textContent).toBe('Average weight: 6.0 kg');
  });

  test('Imagem e seus atributos', () => {
    renderWithRouter(<App />);
    const imgAlt = screen.getByAltText('Pikachu sprite');
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgAlt).toHaveAttribute('src', URL);
  });

  test('Verifica de More details envia para url correta', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);
    const Url = history.location.pathname;
    expect(Url).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);
    const favoriteAlt = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteAlt).toBeInTheDocument();
    expect(favoriteAlt).toHaveAttribute('src', '/star-icon.svg');
  });
});
