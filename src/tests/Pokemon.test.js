// Ajuda Vitor Novaes para solucionar o peso médio do Pokemon pelo data

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderRouter from './renderRouter';
import Pokemon from '../data';
import App from '../App';

describe(' Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderRouter(<App />);
  });

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = Pokemon[0];
    expect(pokeWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokeImg = screen.getByAltText(/sprite/i);
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado contém um link de navegação', () => {
    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se ao clicar no link é feito o redirecionamento da aplicação', () => {
    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);
    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Teste se a URL muda para /pokemon/<id>', () => {
    const { historic } = renderRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);
    const { pathname } = historic.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    userEvent.click(screen.getByText(/More details/));
    // Acessa checkbox e simula clique para favoritar
    const checkboxFav = screen.getByRole('checkbox');
    expect(checkboxFav).toBeInTheDocument();
    userEvent.click(checkboxFav);
    const pokeFav = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(pokeFav).toBeInTheDocument();
    // ícone
    userEvent.click(checkboxFav);
    expect(pokeFav).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
