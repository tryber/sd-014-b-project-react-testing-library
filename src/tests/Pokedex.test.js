import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<App />);
    const pokeHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(pokeHeading).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da
  lista quando o botão Próximo pokémon é clicado`, () => {
    RenderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonNext);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    RenderWithRouter(<App />);
    const renderizedPokemon = screen.getAllByTestId('pokemon-name');
    expect(renderizedPokemon.length).toBe(1);
  });
});
