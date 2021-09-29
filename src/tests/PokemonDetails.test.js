import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente <PokemonDetails.js />', () => {
  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const buttonDetails = screen.getByRole('link', { name: /More/ });
    userEvent.click(buttonDetails);
    expect(buttonDetails).not.toBeInTheDocument();

    const titleDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/,
    });
    expect(titleDetails).toBeInTheDocument();

    const titleSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(titleSummary).toBeInTheDocument();

    const pokemonSummary = screen.getByText(/electricity /);
    expect(pokemonSummary).toBeInTheDocument();
  });

  test(`Existe na página uma seção com os mapas contendo as 
    localizações do pokémon`, () => {
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const titleLocation = screen.getByRole('heading', {
      level: 2,
      name: /Locations of Pikachu/,
    });
    expect(titleLocation).toBeInTheDocument();

    const maps = screen.getAllByAltText(/Pikachu location/);
    expect(maps.length).toBe(2);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Usuário pode favoritar um pokémon através da página de detalhes', () => {
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const favoriteInput = screen.getByRole('checkbox');
    expect(favoriteInput).toBeInTheDocument();

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
