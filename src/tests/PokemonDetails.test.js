import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryText).toBeInTheDocument();

    const detailsText = screen.getByText(/this intelligent pokémon/i);
    expect(detailsText).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas '
  + 'contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const pokemonLocation = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    const mapImg = screen.getAllByAltText(/pikachu location/i);
    expect(mapImg[0]).toBeInTheDocument();
    const mapDescription = screen.getByText(/kanto viridian forest/i);

    expect(pokemonLocation).toBeInTheDocument();
    expect(mapImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapDescription).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon '
  + 'através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });

    expect(favoritePokemon).toBeInTheDocument();
  });
});
