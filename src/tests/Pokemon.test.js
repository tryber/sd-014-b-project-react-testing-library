import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente Pokemon', () => {
  it('testa se é renderizado o card com informações dos pokemons', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
  it('testa o tipo', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
  });
  it('testa o peso', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
  });
  it('testa a imagem', () => {
    renderWithRouter(<App />);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByAltText(/pikachu sprite/i);
    expect(img).toHaveAttribute('src', imgSrc);
  });
  it('testa a url', () => {
    const { history } = renderWithRouter(<App />);
    const text = screen.getByText(/more details/i);
    userEvent.click(text);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('testa se o pokemon é favorito', () => {
    renderWithRouter(<App />);
    const text = screen.getByText(/more details/i);
    userEvent.click(text);
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(favorite);
    const marked = screen.getByAltText(/pikachu is marked as favorite/i);
    const imgSrc = '/star-icon.svg';
    expect(marked).toHaveAttribute('src', imgSrc);
  });
});
