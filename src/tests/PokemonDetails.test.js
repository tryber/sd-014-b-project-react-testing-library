import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "<PokemonDetails.js />"', () => {
  it('Deveria exibir as informações detalhadas do Pokémon selecionado na tela.', () => {
    renderWithRouter(<App />);

    // ref: https://testing-library.com/docs/queries/bytext/
    const linkMoreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(linkMoreDetails);

    const subtitleDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    const subtitleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });

    const paragraph = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity/,
    );

    expect(subtitleDetails).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(subtitleSummary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it(`Deveria existir na página uma seção com os mapas contendo as
   localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);

    const subtitleLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const maps = screen.getAllByRole('img', { name: 'Pikachu location' });
    const map0 = screen.getByText('Kanto Viridian Forest');
    const map1 = screen.getByText('Kanto Power Plant');

    expect(subtitleLocations).toBeInTheDocument();

    expect(map0).toBeInTheDocument();
    expect(map1).toBeInTheDocument();

    expect(maps[0]).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );

    expect(maps[1]).toBeInTheDocument();
    expect(maps[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it(`Deveria possibilitar o usuário poder favoritar um pokémon através
   da página de detalhes`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });

    expect(checkboxFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite).toBeChecked();

    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite).not.toBeChecked();
  });
});
