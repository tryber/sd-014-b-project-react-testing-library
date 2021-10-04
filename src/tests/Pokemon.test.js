import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <Pokemon />', () => {
  describe('A card with the information about a certain pokemon', () => {
    it('should display its correct name', () => {
      renderWithRouter(<App />);

      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
    });

    it('should display its correct type', () => {
      renderWithRouter(<App />);

      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);
    });

    it('should display its average weight on the correct format', () => {
      renderWithRouter(<App />);

      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent(/average weight: 6.0 kg/i);
    });

    it(`should display its image with a "src" and the "alt" attribute
        in the correct format`, () => {
      renderWithRouter(<App />);

      const pokemonImage = screen.getByAltText(/pikachu sprite/i);
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute(
        'src',
        'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      );
    });

    it('should have a link to the page with more details about it', () => {
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      expect(moreDetailsLink).toBeInTheDocument();
      expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
    });

    it('should redirect to the Details page when clicked on the link', () => {
      const { history } = renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);

      expect(screen.getByRole('heading', { level: 2, name: /pikachu details/i }))
        .toBeInTheDocument();
      expect(history.location.pathname).toBe('/pokemons/25');
    });

    it('should have a star icon on the favorited pokemons', () => {
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);

      const isFavoriteCheckbox = screen.getByRole('checkbox');
      userEvent.click(isFavoriteCheckbox);

      const starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
