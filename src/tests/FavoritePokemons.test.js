import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente favorite e suas perspectivas funcionalidades', () => {
  it(`Verifica se ao entrar na página,
    aparece o texto de "No favorite pokemon found"`, () => {
    renderWithRouter(<FavoritePokemons />);

    const elementNotFound = screen.getByText('No favorite pokemon found');
    expect(elementNotFound).toBeInTheDocument();
  });
  it('Verifica se adiciona os pokemons selecionados como favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const moreDatails = screen.getByText('More details');
    userEvent.click(moreDatails);
    const buttonFavorit = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(buttonFavorit);
    history.push('/');
    const buttonFire = screen.getByText('Fire');
    userEvent.click(buttonFire);
    const moreDatailsF = screen.getByText('More details');
    userEvent.click(moreDatailsF);
    const buttonFavoritFire = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(buttonFavoritFire);
    history.push('/favorites');

    const arrayPokemonsName = screen.getAllByTestId('pokemon-name');
    expect(arrayPokemonsName).toHaveLength(2);
  });
});
