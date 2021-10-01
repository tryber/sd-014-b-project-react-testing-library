import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderRouter';
import App from '../App';

describe('O componente Pokemon :', () => {
  it('deve renderizar as informações corretas do pokémon na tela', () => {
    renderWithRouter(<App />);

    const typeBugButton = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(typeBugButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Caterpie sprite');

    expect(pokemonName.textContent).toBe('Caterpie');
    expect(pokemonType.textContent).toBe('Bug');
    expect(pokemonWeight.textContent).toBe('Average weight: 2.9 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });
  it('deve conter um link de more details e haver um botão de favoritar', () => {
    const { history } = renderWithRouter(<App />);

    const typeBugButton = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(typeBugButton);

    const detailsLink = screen.getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/10');

    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/10');

    const locations = screen.getByText('Game Locations of Caterpie');
    expect(locations).toBeInTheDocument();

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const iconFavorite = screen.getByAltText('Caterpie is marked as favorite');
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
