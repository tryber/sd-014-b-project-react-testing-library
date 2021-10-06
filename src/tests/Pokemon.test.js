import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Requisito 06', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');
    const weight = screen.getByText('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('O card indicado contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole(
      'link',
      { name: 'More details' },
    );
    expect(details.href).toContain('/pokemons/25');
  });
  it('Redirecionamento da aplicação para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole(
      'link',
      { name: 'More details' },
    );
    userEvent.click(details);
    const name = screen.getByText('Pikachu Details');
    const path = history.location.pathname;
    expect(name).toBeInTheDocument();
    expect(path).toBe('/pokemons/25');
  });
  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[4] } isFavorite />);
    const favoriteImg = screen.getByRole(
      'img', {
        name:
        'Alakazam is marked as favorite',
      },
    );
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toContain('/star-icon.svg');
    expect(favoriteImg.alt).toBe('Alakazam is marked as favorite');
  });
});
