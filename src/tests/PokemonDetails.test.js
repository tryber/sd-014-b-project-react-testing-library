import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testanto se o PokemonDetails esta funcionando corretamente', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    const pokemon = pokemons[0];

    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

    const name = screen.getByRole('heading', { name: `${pokemon.name} Details` });
    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const details = screen.getByText(pokemon.summary);

    expect(name).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });

  it('Testa se existe  uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    history.push(`pokemons/${pokemon.id}`);

    const location = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemon.name}`,
    });
    expect(location).toBeInTheDocument();

    const img = screen.getAllByAltText('Pikachu location');
    expect(img[0]).toHaveAttribute('src', pokemon.foundAt[0].map);
    expect(img[1]).toHaveAttribute('src', pokemon.foundAt[1].map);
  });

  it(`Teste se existe na página uma seção com os mapas contendo
  as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    history.push(`pokemons/${pokemon.id}`);

    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const checkbox = screen.getByRole('checkbox', { checked: true });
    expect(checkbox).toBeInTheDocument();
  });
});
