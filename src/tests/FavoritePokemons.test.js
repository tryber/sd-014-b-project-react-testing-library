import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Testes do componente <FavoritePokemons.js />', () => {
  it('É exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<App />);
    const linkFavPokemons = screen.getByText(/Favorite Pokémons/i);

    fireEvent.click(linkFavPokemons);

    const msgNoFav = screen.getByText(/No favorite pokemon found/i);
    expect(msgNoFav).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));
    const checkFavPokemon1 = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkFavPokemon1);
    fireEvent.click(screen.getByText(/Home/i));

    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    fireEvent.click(buttonNextPokemon);
    fireEvent.click(screen.getByText(/More details/i));
    fireEvent.click(screen.getByLabelText('Pokémon favoritado?'));

    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const pokemons = screen.getAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(2);
    expect(pokemons[0].textContent).toBe('Pikachu');
    expect(pokemons[1].textContent).toBe('Charmander');
  });

  it('É exibido todos os cards de pokémons favoritados, sem navegação', () => {
    const favoritePokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(2);
    expect(pokemons[0].textContent).toBe('Pikachu');
    expect(pokemons[1].textContent).toBe('Charmander');
  });
});
