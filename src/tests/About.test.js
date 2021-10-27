import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <About />', () => {
  describe('The page about the Pokédex', () => {
    it('should have the title "About Pokédex"', () => {
      renderWithRouter(<About />);
      expect(screen.getByRole('heading', { level: 2, name: /about pokédex/i }))
        .toBeInTheDocument();
    });
    it('should have two paragraphs about the Pokédex', () => {
      renderWithRouter(<About />);
      const paragraphs = screen.getAllByText(/pokémons/i);
      expect(paragraphs).toHaveLength(2);
    });
    it('should have an image of a Pokédex', () => {
      renderWithRouter(<About />);
      const pokedexImgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      expect(screen.getByAltText(/pokédex/i)).toHaveAttribute('src', pokedexImgURL);
    });
  });
});
