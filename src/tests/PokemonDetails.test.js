import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testing the component <PokemonDetails />', () => {
  describe('Test if the pokemon details are displayed on the screen', () => {
    it(`should have a text in the format "<name> Details", where <name>
    is the pokemon name`, () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen.getByRole('heading', { level: 2, name: /pikachu details/i }))
        .toBeInTheDocument();
    });
    it('should not have the nav link to the pokemon details', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(moreDetailsLink).not.toBeInTheDocument();
    });
    it('should have a heading <h2> with the text "Summary"', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen.getByRole('heading', { level: 2, name: /summary/i }))
        .toBeInTheDocument();
    });
    it(`should have a paragraph with a short description of the pokemon
    being displayed`, () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen.getByText(/this intelligent pokémon/i)).toBeInTheDocument();
    });
  });
  describe(`Test if there is a section with the maps presenting the game locations
  of the pokemon`, () => {
    it(`should have a heading <h2> with the text "Game Locations of <name>",
    where <name> is the pokemon name`, () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen
        .getByRole('heading', { level: 2, name: /game locations of pikachu/i }))
        .toBeInTheDocument();
    });
    it('should be displayed all locations of the pokemon', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      const pikachuLocations = pokemons[0].foundAt;
      expect(screen.getAllByAltText(/pikachu location/i))
        .toHaveLength(pikachuLocations.length);
    });
    it('should be displayed the name and a map image from each location', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      const pikachuLocations = pokemons[0].foundAt;
      pikachuLocations.forEach(({ location }) => (
        expect(screen.getByText(location)).toBeInTheDocument()
      ));
    });
    describe('The location image', () => {
      it('should have an attribute "src" with the location URL', () => {
        renderWithRouter(<App />);
        const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
        userEvent.click(moreDetailsLink);
        const pikachuLocations = pokemons[0].foundAt;
        const mapsOnTheScreen = screen.getAllByAltText(/pikachu location/i);
        pikachuLocations.forEach(({ map }, index) => {
          expect(mapsOnTheScreen[index]).toBeInTheDocument();
          expect(mapsOnTheScreen[index]).toHaveAttribute('src', map);
        });
      });
    });
  });
  describe(`Test if the user can mark the pokemon as favorite through the Details
  page`, () => {
    it(`should have a checkbox input that allows the pokemon to be marked as
    favorite`, () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen.getByRole('checkbox', { name: /pokémon favoritado?/i }))
        .toBeInTheDocument();
    });
    it(`toggled clicks on the checkbox should respectively add and remove the
    pokemon from the favorites list`, () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      let starIcon = screen.queryByAltText(/pikachu is marked as favorite/i);
      expect(starIcon).not.toBeInTheDocument();
      const isFavoriteCheckbox = screen
        .getByRole('checkbox', { name: /pokémon favoritado?/i });
      userEvent.click(isFavoriteCheckbox);
      starIcon = screen.getByAltText(/pikachu is marked as favorite/i);
      expect(starIcon).toBeInTheDocument();
      userEvent.click(isFavoriteCheckbox);
      starIcon = screen.queryByAltText(/pikachu is marked as favorite/i);
      expect(starIcon).not.toBeInTheDocument();
    });
    it('the checkbox label should have the text "Pokémon favoritado?"', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsLink);
      expect(screen.getByLabelText(/pokémon favoritado?/i)).toBeInTheDocument();
    });
  });
});
