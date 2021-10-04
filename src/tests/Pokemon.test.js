import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 6 - Pokemon test', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');

    const pokeWheight = screen.getByTestId('pokemon-weight');
    expect(pokeWheight).toHaveTextContent(/Average weight: 6.0 kg/);

    const pokeImage = screen.getByAltText(/sprite/);
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se o card do Pokémon indicado tem um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(pokeDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokeDetails);

    const pokeInput = screen.getByRole('checkbox');
    userEvent.click(pokeInput);

    const pokeFavoriteImage = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(pokeFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
