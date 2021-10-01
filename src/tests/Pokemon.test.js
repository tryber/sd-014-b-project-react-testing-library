import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  const PIKACHU_DETAILS_URL = '/pokemons/25';
  it('deveria renderizar um card com informações do Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByAltText('Pikachu sprite');

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('deveria conter um link em More Details com o id do Pokemón', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', PIKACHU_DETAILS_URL);
  });

  it('deveria redirecionar para a página de detalhes'
    + ' do Pokémon ao clicar em More details', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(PIKACHU_DETAILS_URL);
  });

  it('deveria mostrar uma estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_DETAILS_URL);
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    history.push('/');
    const pikachuFavoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(pikachuFavoriteStar).toBeInTheDocument();
    expect(pikachuFavoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
