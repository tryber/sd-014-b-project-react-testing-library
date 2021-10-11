import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'More details',
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
});
