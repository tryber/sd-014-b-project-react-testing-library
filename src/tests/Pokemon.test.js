import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Verifica o componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const pikachuImage = screen.getByRole('img');
      expect(pikachuImage).toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

  test('Verifica se o nome correposnde ao Pokemon', () => {
    renderWithRouter(<App />);
    const matchingName = screen.getByRole('img');
    expect(matchingName).toHaveAttribute('alt',
      'Pikachu sprite');
  });

  test('Verifica se o nome do pokemon está correto', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();
  });

  test('Verifica se o tipo do pokemon está correto', () => {
    renderWithRouter(<App />);
    const pikachuType = screen.getAllByText('Electric');
    expect(pikachuType.length).toStrictEqual(2);
  });

  test('Verifica se é mostrado o peso do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação',
    () => {
      renderWithRouter(<App />);
      const linkNavigation = screen.getByRole('link', { name: 'More details' });
      expect(linkNavigation).toBeInTheDocument();
      userEvent.click(linkNavigation);
      const summary = screen.getByText('Summary');
      expect(summary).toBeInTheDocument();
    });

  test('Verifica se aparece uma estrela no pokemon favorito', () => {
    renderWithRouter(<App />);
    const favoriteStar = screen.getByRole('link', { name: 'More details' });
    userEvent.click(favoriteStar);
    expect(favoriteStar).toHaveAttribute('href', '/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);

    const img = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
