import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Req 6 - Testa o componente "Pokemon.js"', () => {
  it('Deve renderizar um card com as informações de cada Pokémon determinado', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const averageWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(averageWeightPokemon).toHaveTextContent(/Average weight: 6.0 kg/i);

    const imagePokemon = screen.getByAltText(/sprite/i);
    expect(imagePokemon).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Deve renderizar um link de navegação no card'
    + ' para exibir detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  // ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/60/files
  it('Deve exibir um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetailsLink);

    const pokemonInput = screen.getByRole('checkbox');
    userEvent.click(pokemonInput);

    const pokemonFavoriteImage = screen.getByAltText(/is marked as favorite/i);
    expect(pokemonFavoriteImage).toHaveAttribute('src',
      '/star-icon.svg');
  });
});
