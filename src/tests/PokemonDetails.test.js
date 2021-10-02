import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

// Peguei o conceito do history.push do PR da Beatriz
const routePikachu = '/pokemons/25';

describe('Requisito 02', () => {
  test(
    'Se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { history } = renderWithRouter(<App />);
      const buttonMoreDetails = screen.getByRole('link', { name: 'More details' });
      expect(buttonMoreDetails).toBeInTheDocument();

      userEvent.click(buttonMoreDetails);
      expect(history.location.pathname).toBe(routePikachu);

      const namePoke = screen.getByText('Pikachu Details');
      expect(namePoke).toBeInTheDocument();

      const sessionDetails = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(sessionDetails).toBeInTheDocument();

      const detailsPokeInfo = screen.getByText(pokemons[0].summary);
      expect(detailsPokeInfo).toBeInTheDocument();
    },
  );

  test(
    'Se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(routePikachu);

      const namePoke = screen.getByText('Pikachu Details');
      expect(namePoke).toBeInTheDocument();

      const sessionDetails = screen.getByRole('heading', {
        level: 2,
        name: 'Game Locations of Pikachu',
      });
      expect(sessionDetails).toBeInTheDocument();

      const detailsPokeInfo = screen.getByText(pokemons[0].summary);
      expect(detailsPokeInfo).toBeInTheDocument();

      const mapImage = screen.getAllByAltText('Pikachu location');
      expect(mapImage.length).toBe(pokemons[0].foundAt.length);
      expect(mapImage[0]).toHaveAttribute('src', pokemons[0].foundAt[0].map);
      expect(mapImage[1]).toHaveAttribute('src', pokemons[0].foundAt[1].map);
    },
  );

  test(
    'se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(routePikachu);

      const checkFavorite = screen.getByRole('checkbox');
      expect(checkFavorite).toBeInTheDocument();

      const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
      expect(labelCheckbox).toBeInTheDocument();

      userEvent.click(checkFavorite);

      const pokeFavorite = screen.getByRole('checkbox', { checked: true });
      expect(pokeFavorite).toBeInTheDocument();
    },
  );
});
