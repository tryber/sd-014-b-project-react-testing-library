import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    // constantes antes do click
    const buttonMoreDetails = screen.getByText('More details');
    const pokeNameAfterClick = screen.getByTestId('pokemon-name');
    ///
    // O nome correto do Pokémon deve ser mostrado na tela.
    userEvent.click(buttonMoreDetails);
    const pokeTypeAfterClick = screen.getByTestId('pokemon-type');
    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(pokeTypeAfterClick.textContent).toBe('Electric');
    expect(pokeNameAfterClick.textContent).toBe('Pikachu');
    const getImagePokemon = screen.getByAltText('Pikachu sprite');
    expect(getImagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    // peso médio do pokemon
    userEvent.click(buttonMoreDetails);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    const average = screen.getByTestId('pokemon-weight');
    const all = `${value} ${measurementUnit}`;
    expect(average.textContent).toBe(`Average weight: ${all}`);

    // Teste se o card do Pokémon indicado na Pokédex contém um link
    expect(buttonMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
    // Teste se existe um ícone de estrela nos Pokémons favoritados
    const getLabel = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(getLabel);
    const imageFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(imageFav).toHaveAttribute('src', '/star-icon.svg');
  });
});
