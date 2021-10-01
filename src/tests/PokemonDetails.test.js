import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter ';
import data from '../data';

describe('Testando o componente "PokemonDetails.js', () => {
  test('Verificar se o texto "<name> details" é renderizado.', () => {
    const { history } = renderWithRouter(<App />);
    const LinkMoreDetails = screen.getByRole('link', { name: 'More details' });
    history.push('/pokemons/151');
    const h2 = screen.getByRole('heading', { level: 2, name: `${data[5].name} Details` });
    expect(h2).toBeInTheDocument();
    expect(LinkMoreDetails).not.toBeInTheDocument();
    const h2Summary = screen.getByRole('heading', { name: 'Summary' });
    expect(h2Summary).toBeInTheDocument();

    const pokemonSummary = screen.getByText(data[5].summary);
    expect(pokemonSummary).toBeInTheDocument();

    const gameLocation = screen.getByRole('heading', { level: 2,
      name: `Game Locations of ${data[5].name}` });
    expect(gameLocation).toBeInTheDocument();

    const urlMap = data[5].foundAt[0].map;
    const pokemonLocation = screen.getByAltText(`${data[5].name} location`);
    expect(pokemonLocation).toHaveAttribute('src', urlMap);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/);
    expect(checkbox).toBeInTheDocument();
  });
});
