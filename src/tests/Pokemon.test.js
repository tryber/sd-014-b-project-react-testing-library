import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { Pokemon } from '../components';

describe('Testando o componente Pokemon.js', () => {
  const ekansData = {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
  };

  it('Verifica se o nome, tipo, peso e imagem do pokemon exibem corretamente', () => {
    const { value, measurementUnit } = ekansData.averageWeight;
    renderWithRouter(<Pokemon pokemon={ ekansData } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText('sprite', { exact: false });
    expect(pokeName.textContent).toBe(ekansData.name);
    expect(pokeType.textContent).toBe(ekansData.type);
    expect(pokeWeight.textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toHaveAttribute('src', ekansData.image);
    expect(pokeImage).toHaveAttribute('alt', `${ekansData.name} sprite`);
  });

  it('Verifica se o card contém um link que redireciona para mais detalhes do pokemon',
    () => {
      const { history } = renderWithRouter(<Pokemon pokemon={ ekansData } />);
      const moreInfoLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(moreInfoLink);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${ekansData.id}`);
    });

  it('Verifica se existe um ícone de estrela para os pokemons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ ekansData } isFavorite />);
    const starImg = screen.getByAltText('is marked as favorite', { exact: false });
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', `${ekansData.name} is marked as favorite`);
  });
});
