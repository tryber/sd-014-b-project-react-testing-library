import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../uteis/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente "PokemonDetails".', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se o título de detalhes do pokemon está na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const h2PokemonDetails = screen
      .getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(h2PokemonDetails).toBeInTheDocument();
  });

  test('se o H2 com o texto "Summary" está na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const summaryText = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryText).toBeInTheDocument();
  });

  test(`se existi um h2 com o texto "Game Locations of <name>;
  onde <name> é o nome do Pokémon exibido.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const h2GameLocations = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(h2GameLocations).toBeInTheDocument();
  });

  test('Se a imagem do local do pokemon está na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const imgMap = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(imgMap[0]).toBeInTheDocument();
    expect(imgMap[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});
