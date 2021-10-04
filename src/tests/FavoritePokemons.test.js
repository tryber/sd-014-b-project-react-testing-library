import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';
// import { render } from 'react-dom';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite
  pokemon found, se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<App />);

    const favPokemons = screen.getByText('Favorite Pokémons');

    fireEvent.click(favPokemons);

    const noFavMsg = screen.getByText('No favorite pokemon found');
    expect(noFavMsg).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
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

    const favPokemons = screen.getAllByTestId('pokemon-name');
    expect(favPokemons.length).toBe(2);
    expect(favPokemons[0].textContent).toBe('Pikachu');
    expect(favPokemons[1].textContent).toBe('Charmander');
  });
});
