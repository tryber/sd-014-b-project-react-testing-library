import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 - Testa o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações detalhadas do'
        + 'Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(linkDetails);

    const titleH2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(titleH2).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const summaryH2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryH2).toBeInTheDocument();

    const pokeInfo = screen.getByText(`${pokemons[0].summary}`);
    expect(pokeInfo).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção'
      + ' com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    const locations = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu',
      });

    expect(locations).toBeInTheDocument();

    const maps = screen.getAllByAltText('Pikachu location');

    expect(maps.length).toBe(pokemons[0].foundAt.length);

    maps.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });

  test('Verifica se o usuário pode favoritar'
        + 'um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();

    fireEvent.click(checkbox);

    const favorite = screen.getByAltText(/is marked as favorite/i);
    expect(favorite).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favorite).not.toBeInTheDocument();
  });
});
