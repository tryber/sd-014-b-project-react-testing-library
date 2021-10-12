import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

//  pokemon, showDetailsLink, isFavorite

const urlPikachu = '/pokemons/25';

describe('Testa a funcionalidade do componente Pokemon', () => {
  it('verifica card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();

    const type = screen.getByText(/electric/i);
    expect(type).toBeInTheDocument();

    const weight = screen.getByText(/average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    const imgPikachu = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image.src).toContain(imgPikachu);
  });

  it('verifica link para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', urlPikachu);
  });

  it('verifica redirecionamento da aplicação para a página de detalhes e a URL', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(urlPikachu);
  });

  it('existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    const star = '/star-icon.svg';
    const image = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(star);
  });
});
