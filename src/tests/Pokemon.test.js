import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  it('Deveria renderizar um card com as informações de determinado pokémon', () => {
    const { name, type, averageWeight: { value, measurementUnit }, image } = data[0];
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    expect(screen.getByRole('img').src).toBe(image);
    expect(screen.getByRole('img').alt).toBe(`${name} sprite`);
  });

  it(`Deveria existir no card do Pokémon indicado na Pokédex um link de navegação para
   exibir detalhes deste Pokémon. O link deve possuir a URL "/pokemons/<id>", onde "<id>"
    é o id do Pokémon exibido`, () => {
    const { id } = data[0];

    renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } />,
    );

    const details = screen.getByRole('link', { name: 'More details' });

    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it(`Deveria ser feito o redirecionamento da aplicação ao clicar no link de navegação do
   Pokémon, é  para a página de detalhes de Pokémon`, () => {
    const { id } = data[0];

    const { history } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } />,
    );

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Deveria existir um ícone de estrela nos Pokémons favoritados', () => {
    const { name } = data[0];

    renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite />,
    );

    const iconStar = screen.getByAltText(`${name} is marked as favorite`);
    expect(iconStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
