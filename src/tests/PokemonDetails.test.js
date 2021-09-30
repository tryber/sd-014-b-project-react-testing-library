import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';
import pokemons from '../data';

describe('7 - Crie a página de "Mais Detalhes" do pokemon', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const { name: name1, summary: summary1, foundAt: foundAt1, id: id1 } = pokemons[0];

  const regExName1 = new RegExp(String.raw`${name1} details`, 'i');
  const pokemonByType = pokemons
    .find((poke) => poke.type === pokemons[pokemons.length - 1].type);
  const regExName2 = new RegExp(String.raw`${pokemonByType.name} details`, 'i');

  const { name: name2, summary: summary2, foundAt: foundAt2, id: id2 } = pokemonByType;

  test('Se o link no card redireciona para os detalhes do pokemon', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: /details/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: regExName1,
    })).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${id1}`);

    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByRole('button', { name: pokemonByType.type }));
    userEvent.click(screen.getByRole('link', { name: /details/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: regExName2,
    })).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${pokemonByType.id}`);
  });

  test('Se são exibidos todos os detalhes do pokemon', () => {
    const { history } = renderRoute(`/pokemons/${id1}`);

    const pokeLocations1 = screen.getAllByRole('img')
      .filter(({ alt }) => alt === `${name1} location`);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(summary1)).toBeInTheDocument();
    expect(screen.getByText(`Game Locations of ${name1}`)).toBeInTheDocument();
    expect(pokeLocations1).toHaveLength(foundAt1.length);
    expect(screen.getByLabelText(/pokémon favoritado?/i)).toBeInTheDocument();

    if (foundAt1.length > 0) {
      if (foundAt1.length > 1) {
        expect(pokeLocations1[1].src).toBe(foundAt1[1].map);
        expect(screen.getByText(foundAt1[1].location)).toBeInTheDocument();
      }
      expect(pokeLocations1[0].src).toBe(foundAt1[0].map);
      expect(screen.getByText(foundAt1[0].location)).toBeInTheDocument();
    }

    // Primeiro pokemon do último tipo
    history.push(`/pokemons/${id2}`);

    const pokeLocations2 = screen.getAllByRole('img')
      .filter(({ alt }) => alt === `${name2} location`);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(summary2)).toBeInTheDocument();
    expect(screen.getByText(`Game Locations of ${name2}`)).toBeInTheDocument();
    expect(pokeLocations2).toHaveLength(foundAt2.length);
    expect(screen.getByLabelText(/pokémon favoritado?/i)).toBeInTheDocument();

    if (foundAt2.length > 0) {
      if (foundAt1.length > 1) {
        expect(pokeLocations2[1].src).toBe(foundAt2[1].map);
        expect(screen.getByText(foundAt2[1].location)).toBeInTheDocument();
      }
      expect(pokeLocations2[0].src).toBe(foundAt2[0].map);
      expect(screen.getByText(foundAt2[0].location)).toBeInTheDocument();
    }
  });
});
