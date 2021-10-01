import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import data from '../data';

describe('7 - Testa o componente PokemonDetails.js ', () => {
  test('Verifica se os detalhes do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const { name } = data[0];

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(pokemonDetails);

    const nameDetails = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(nameDetails).toBeInTheDocument();
    // Verifica se a página não contém link de navegação
    expect(pokemonDetails).not.toBeInTheDocument();
  });

  test('Verifica se a seção de detalhes contém um heading h2 com o texto Summary'
  + 'contém um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<App />);
    const { summary } = data[0];

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    fireEvent.click(pokemonDetails);

    const elementTitleSummary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(elementTitleSummary).toBeInTheDocument();

    const elementTextSummary = screen.getByText(summary);
    expect(elementTextSummary).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os'
    + 'mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const { name, foundAt } = data[0];

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(pokemonDetails);

    const elementGameLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(elementGameLocations).toBeInTheDocument();

    // const mapsLocation = screen.getAllByAltText(`${name} location`);
    // expect(mapsLocation.length).toBe(foundAt.length);
    // expect(mapsLocation[0]).toHaveAttribute('src', foundAt[0].map);

    for (let index = 0; index < foundAt.length; index += 1) {
      const locationMap = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(locationMap[index]).toBeInTheDocument();

      const locationName = screen.getByText(foundAt[index].location);
      expect(locationName).toBeInTheDocument();

      const urlMap = foundAt[index].map;
      expect(locationMap[index]).toHaveAttribute('src', urlMap);

      expect(locationMap[index]).toHaveAttribute('alt', `${name} location`);
    }
  });
  test('Verifica se usuário pode favoritar um pokémon através da página detalhes', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(pokemonDetails);

    const checkboxFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkboxFavorite).toBeInTheDocument();

    fireEvent.click(checkboxFavorite);

    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(checkboxFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
