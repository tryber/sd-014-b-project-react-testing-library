import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it(`Deve renderizar um card com as informações de um pokémon:
    nome, tipo, peso médio e imagem`, () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
    expect(screen.getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  it(`O card do pokémon exibido deve conter um link de navegação
  para exibir os detalhes deste pokémon`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemon } />);
    const linkToPokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToPokemonDetails).toBeInTheDocument();
    expect(linkToPokemonDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it(`A URL exibida no navegador deve mudar para
    /pokemon/<id>, onde <id> é o id do Pokémon
    cujos detalhes se deseja ver`, () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemon } />,
    );

    const linkToPokemonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkToPokemonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Deve existir um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const favStar = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favStar).toBeInTheDocument();
    expect(favStar.src).toMatch(/star-icon.svg/i);
    expect(favStar.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
