import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o componente Pokedex.js', () => {
  // Funções a serem utilizadas nos testes
  const getPokemon = (name) => screen.getByText(`${name} Details`);
  // const getAlt = (name) => screen.getByAltText(`${name} sprite`);

  // const pikachuUrl = '/pokemons/25';
  // const charmanderUrl = '/pokemons/4';

  it('Testa as informações detalhadas do card detalhes', () => {
    renderWithRouter(<App />);

    // Faz os Testes com o Pikachu
    const getDetailLink = screen.getByRole('link', { name: /more detail/i });
    fireEvent.click(screen.getByText(/details/i));
    getPokemon('Pikachu');
    expect(getDetailLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    }));
    expect(screen.getByText(/This intelligent Pokémon/));

    // Testa com o charmander
    fireEvent.click(screen.getByText(/home/i));
    fireEvent.click(screen.getByText(/fire/i));
    fireEvent.click(screen.getByText(/details/i));
    getPokemon('Charmander');
    expect(getDetailLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    }));
    expect(screen.getByText(/The flame on its tail/));
  });

  it('Testa se a parte dos mapas aparece corretamente', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/details/i));
    screen.getByRole('heading', { name: /game locations of pikachu/i });
    screen.getByText(/kanto viridian forest/i);
    expect(screen.getAllByRole('img')[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    screen.getAllByAltText('Pikachu location');
  });

  it('Testa o checkbox', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/details/i));
    screen.getByText(/favoritado/i);
  });
});
