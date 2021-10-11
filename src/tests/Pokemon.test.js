import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a aplicação Pokemon', () => {
  test('Se é renderizado um card com as informações de um Pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokeImg = screen.getByAltText(/sprite/i);
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se contém um link para os detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const url = '/pokemons/25';

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', url);
    userEvent.click(detailsLink);
    const pikachuDetails = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(url);
  });

  test('Se contém um link para os detalhes do pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);
    const favStar = screen.getByRole('checkbox');
    userEvent.click(favStar);
    const imgStar = screen.getByAltText(/marked as favorite/);
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
