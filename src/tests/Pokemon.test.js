import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 02', () => {
  test(
    'Se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      const namePoke = screen.getByTestId('pokemon-name');
      expect(namePoke.textContent).toBe('Pikachu');

      const typePoke = screen.getByTestId('pokemon-type');
      expect(typePoke.textContent).toBe('Electric');

      const averageWeight = screen.getByTestId('pokemon-weight');
      expect(averageWeight.textContent).toBe('Average weight: 6.0 kg');

      const imagePoke = screen.getAllByRole('img')[0];
      expect(imagePoke).toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(imagePoke).toHaveAttribute('alt', 'Pikachu sprite');
    },
  );

  test(
    'Se o card do Pokémon indicado na Pokédex contém um'
      + 'link de navegação para exibir detalhes deste Pokémon.',
    () => {
      const { history } = renderWithRouter(<App />);
      const buttonMoreDetails = screen.getByRole('link', { name: 'More details' });
      expect(buttonMoreDetails).toBeInTheDocument();

      userEvent.click(buttonMoreDetails);
      expect(history.location.pathname).toBe('/pokemons/25');

      const favoriteButton = screen.getByRole('checkbox');
      expect(favoriteButton).toBeInTheDocument();
      userEvent.click(favoriteButton);

      const starFavoriteImage = screen.getAllByRole('img')[1];
      expect(starFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
      expect(starFavoriteImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
      expect(starFavoriteImage).toBeInTheDocument();
    },
  );

  test(
    `Se ao clicar no link de navegação do Pokémon,
    é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`,
    () => {
      const { history } = renderWithRouter(<App />);
      const buttonMoreDetails = screen.getByRole('link', { name: 'More details' });
      userEvent.click(buttonMoreDetails);

      const text = screen.getByText('Pikachu');
      expect(history.location.pathname).toBe('/pokemons/25');
      expect(text).toBeInTheDocument();
    },
  );
});
