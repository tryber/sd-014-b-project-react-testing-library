import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

beforeEach(() => RenderWithRouter(<App />));

describe('Testa o componente <PokemonDetails.js />', () => {
  test('se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const detailsButton = screen.getByRole('link', {
        name: /More/,
      });
      userEvent.click(detailsButton);
      expect(detailsButton).not.toBeInTheDocument();

      const titleDetails = screen.getByRole('heading', {
        level: 2,
        name: 'Pikachu Details',
      });
      expect(titleDetails).toBeInTheDocument();

      const titleSummary = screen.getByRole('heading', {
        level: 2, name: 'Summary',
      });
      expect(titleSummary).toBeInTheDocument();

      const pokemonSummary = screen.getByText(/electricity/);
      expect(pokemonSummary).toBeInTheDocument();
    });

  test(`se existe na página uma seção com os mapas contendo as
    localizações do pokémon`, () => {
    const detailsButton = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsButton);

    const titleLocation = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(titleLocation).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toBe(2);
    expect(maps[0]).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const detailsButton = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsButton);

    const favoriteInput = screen.getByRole('checkbox');
    expect(favoriteInput).toBeInTheDocument();

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
