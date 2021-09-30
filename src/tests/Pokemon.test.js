import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Pokemon from '../components/Pokemon';

const pikachu = {
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
};

test('Testa se o card do pokemon é renderziado com as informações corretas', () => {
  renderWithRouter(
    <Pokemon
      pokemon={ pikachu }
      isFavorite
    />,
  );
  const { name, type, averageWeight: { value, measurementUnit }, image } = pikachu;
  const averageWeightText = `Average weight: ${value} ${measurementUnit}`;
  const imageElement = screen.getByAltText('Pikachu sprite');
  const navegationLink = screen.getByRole('link');
  const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(type)).toBeInTheDocument();
  expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(averageWeightText);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement.src).toBe(image);
  expect(navegationLink.href).toBe('http://localhost/pokemons/25');
  expect(favoriteIcon).toBeInTheDocument();
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});

test('Testa se os links de navegação estão funcionando corretamente', () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ pikachu }
      isFavorite
    />,
  );
  const navegationLink = screen.getByRole('link');
  expect(navegationLink).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
  userEvent.click(navegationLink);
  expect(history.location.pathname).toBe('/pokemons/25');
});
