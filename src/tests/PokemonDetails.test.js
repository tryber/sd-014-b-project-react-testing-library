import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonObject = pokemons[0];
const detailsLinkPath = 'More details';

describe('07 - Teste o componente <PokemonDetails.js />', () => {
  test('a) Se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByRole('link', { name: detailsLinkPath }));

      expect(screen.getByText(`${pokemonObject.name} Details`)).toBeInTheDocument();

      expect(screen.queryByText(detailsLinkPath)).toBeNull();

      expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
        .toBeInTheDocument();

      expect(screen.getByText(pokemonObject.summary)).toBeInTheDocument();
    });

  test('b) Se existe na página uma seção com os mapas contendo as localizações',
    () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByRole('link', { name: detailsLinkPath }));

      expect(screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${pokemonObject.name}` }))
        .toBeInTheDocument();

      pokemonObject.foundAt.forEach(({ location, map }, index) => {
        expect(screen.getByText(location)).toBeInTheDocument();
        const locationImage = screen.getAllByAltText(`${pokemonObject.name} location`);
        expect(locationImage[index]).toHaveAttribute('src', map);
      });
    });

  test('c) Se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);

      userEvent.click(screen.getByRole('link', { name: detailsLinkPath }));

      const favoriteCheckbox = screen.getByRole('checkbox');
      expect(favoriteCheckbox).toBeInTheDocument();

      const favoriteCheckboxByLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(favoriteCheckboxByLabel).toBeInTheDocument();

      expect(favoriteCheckbox).toBe(favoriteCheckboxByLabel);

      const nothingFound = screen
        .queryByText(`${pokemonObject.name} is marked as favorite`);
      expect(nothingFound).toBeNull();

      userEvent.click(favoriteCheckbox);

      const favoriteIcon = screen
        .getByAltText(`${pokemonObject.name} is marked as favorite`);
      expect(favoriteIcon).toBeInTheDocument();

      userEvent.click(favoriteCheckbox);

      const nothingFoundAgain = screen
        .queryByText(`${pokemonObject.name} is marked as favorite`);
      expect(nothingFoundAgain).toBeNull();
    });
});
