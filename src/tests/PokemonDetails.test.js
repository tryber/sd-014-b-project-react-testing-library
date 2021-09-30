import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import onUpdateFavoritePokemons from '../App';

const summaryPart = [
  'This intelligent Pokémon roasts hard berries with electricity',
  'to make them tender enough to eat.'];
const pikachu = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `${summaryPart[0]} ${summaryPart[1]}`,
}];

test('Testa se os detalhes do pokemon são renderizados corretamente', () => {
  const match = { params: { id: '25' } };
  renderWithRouter(
    <PokemonDetails
      pokemons={ pikachu }
      match={ match }
      isPokemonFavoriteById={ { id: true } }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
    />,
  );
  const describeLink = screen.queryByRole('link', { name: 'More details' });
  const sumary = screen.getByRole('heading', { level: 2, name: 'Summary' });
  expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  expect(describeLink).toBeNull();
  expect(sumary).toBeInTheDocument();
  expect(screen.getByText(pikachu[0].summary)).toBeInTheDocument();
});

test('Se os mapas são renderizados', () => {
  const match = { params: { id: '25' } };
  renderWithRouter(
    <PokemonDetails
      pokemons={ pikachu }
      match={ match }
      isPokemonFavoriteById={ { id: true } }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
    />,
  );
  const mapTitle = screen.getByRole(
    'heading',
    { level: 2, name: 'Game Locations of Pikachu' },
  );
  const mapsImages = screen.getAllByAltText('Pikachu location');
  const map1 = screen.getByText('Kanto Viridian Forest');
  const map2 = screen.getByText('Kanto Power Plant');
  expect(mapTitle).toBeInTheDocument();
  expect(mapsImages.length).toBe(2);
  expect(mapsImages[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapsImages[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(map1).toBeInTheDocument();
  expect(map2).toBeInTheDocument();
});

test('Testa se os favoritos são renderizadas corretamente', () => {
  const match = { params: { id: '25' } };
  const onUpdateFavoritePokemonsMock = jest.fn().mockImplementation(
    (pokemonId, checked) => !checked,
  );
  renderWithRouter(
    <PokemonDetails
      pokemons={ pikachu }
      match={ match }
      isPokemonFavoriteById={ { id: true } }
      onUpdateFavoritePokemons={ onUpdateFavoritePokemonsMock }
    />,
  );
  const favoriteCheckboxText = screen.getByText('Pokémon favoritado?');
  const favoriteCheckbox = screen.getByRole('checkbox');
  expect(favoriteCheckbox).toBeInTheDocument();
  userEvent.click(favoriteCheckbox);
  expect(favoriteCheckbox.checked).toBeTruthy();
  userEvent.click(favoriteCheckbox);
  expect(favoriteCheckbox.checked).toBeFalsy();
  expect(favoriteCheckboxText).toBeInTheDocument();
});
