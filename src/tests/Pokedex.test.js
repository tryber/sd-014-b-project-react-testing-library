import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente <Pokedex.js />', () => {
  it('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const pokedexTitle = screen.getByRole('heading', { level: 2,
      name: 'Encountered pokémons' });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it(`É exibido o próximo Pokémon da lista quando o botão
     Próximo pokémon é clicado`, () => {
    const nextPokedex = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokedex).toBeInTheDocument();
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    const onePokedex = screen.getAllByTestId('pokemon-name');
    expect(onePokedex.length).toBe(1);
  });

  it('Pokédex tem os botões de filtro', () => {
    const typesPokemons = 7;
    const typesFilter = screen.getAllByTestId('pokemon-type-button');
    expect(typesFilter.length).toBe(typesPokemons);

    const electricPoke = screen.getByRole('button', { name: 'Electric' });
    expect(electricPoke).toBeInTheDocument();
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const pokedexAll = screen.getByRole('button', { name: 'All' });
    expect(pokedexAll).toBeInTheDocument();

    userEvent.click(pokedexAll);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
  });
});
