import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('6 - Testa o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Charmander sprite');

    expect(pokemonName.textContent).toBe('Charmander');
    expect(pokemonType.textContent).toBe('Fire');
    expect(pokemonWeight.textContent).toBe('Average weight: 8.5 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  it('Testa se o Card contém um link de navegação para exibir mais detalhes', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/4');
  });
  it('Teste se ao clicar no `More Details` do Pokémon a página é redirecionada.', () => {
    const { history } = renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemons/4');
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');

    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    const favoriteStar = screen.getByAltText('Charmander is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
