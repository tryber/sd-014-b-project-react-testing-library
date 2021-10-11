import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Req 7 - Testa o componente PokemonDetails', () => {
  const moreDetailsText = 'More details';
  it('Deve renderizar as informações detalhadas do Pokemon na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(moreDetailsLink);

    const detailsPokemon = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(detailsPokemon).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const detailsSection = screen.getByText(/This intelligent Pokémon/i);
    expect(detailsSection).toBeInTheDocument();
  });

  it('Deve renderizar uma seção com os mapas', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(moreDetailsLink);

    const pokemonsMaps = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(pokemonsMaps).toBeInTheDocument();

    // ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/1/files
    const mapsPage = screen.getAllByAltText(/Pikachu location/);
    expect(mapsPage.length).toBe(2);
    expect(mapsPage[0]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Deve ser possível favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', {
      name: moreDetailsText,
    });
    userEvent.click(moreDetailsLink);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
