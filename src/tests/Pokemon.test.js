import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

const setup = () => {
  const pokemon = {
    averageWeight: {
      measurementUnit: 'kg',
      value: '60',
    },
    foundAt: [{
      location: '',
      map: '',
    }],
    id: 1,
    image: 'url/enfjnv',
    moreInfo: '',
    name: 'pikachu',
    summary: '',
    type: 'eletrico',
  };
  return renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
};

describe('Testa o componente Ponkemon', () => {
  test('se é renderizado um card com as informações do pokémon.', () => {
    setup();
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('pikachu');
    const imagemPokemon = screen.getByAltText('pikachu sprite');
    expect(imagemPokemon.src).toContain('url/enfjnv');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('eletrico');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 60 kg');
  });

  test('se o card contém um link de navegação para exibir mais detalhes', () => {
    setup();
    const linkDetails = screen.getByRole('link');
    expect(linkDetails).toBeInTheDocument();
  });
  test('se ao clicar no link do Pokémon redireciona da para a página de detalhes', () => {
    const { history } = setup();
    const linkDetails = screen.getByRole('link');
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/1');
  });
  test('se a URL exibida no navegador muda para /pokemon/<id>', () => {
    setup();
    const linkDetails = screen.getByRole('link');
    expect(linkDetails.href).toContain('/pokemons/1');
  });
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    setup();
    const favoriteIcon = screen.getByAltText('pikachu is marked as favorite');
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
