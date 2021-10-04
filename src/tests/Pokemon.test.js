import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Informações de determinado pokémon.', () => {
    render(<Router><Pokemon pokemon={ pokemons[0] } isFavorite={ false } /></Router>);

    const pokName = screen.getByTestId('pokemon-name');
    expect(pokName).toHaveTextContent(/pikachu/i);

    const pokType = screen.getByTestId('pokemon-type');
    expect(pokType).toHaveTextContent(/electric/i);

    const pokWeight = screen.getByTestId('pokemon-weight');
    expect(pokWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const pokImage = screen.getByAltText(/pikachu sprite/i);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokImage).toBeInTheDocument();
    expect(pokImage.src).toContain(imgUrl);
  });

  it('Contém link detalhes', () => {
    render(<Router><Pokemon pokemon={ pokemons[0] } isFavorite={ false } /></Router>);

    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link.href).toContain('/pokemons/25');
  });

  it('Redirecionamento para página detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    const link = screen.getByText(/more details/i);
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Estrela em pokemon favoritado', () => {
    render(<Router><Pokemon pokemon={ pokemons[0] } isFavorite /></Router>);

    const starFav = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(starFav.src).toContain('/star-icon.svg');
  });
});
