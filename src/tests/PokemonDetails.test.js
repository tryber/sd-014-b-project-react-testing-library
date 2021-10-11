import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const MORE_DETAILS = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  test(
    'este se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const pikachuDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
      const pikachuSummaryHeading = screen.getByRole('heading', { name: 'Summary' });
      const pikachuSummaryParagraph = screen
        .getByText('This intelligent Pokémon roasts hard'
          + ' berries with electricity to make them tender enough to eat.');

      expect(pikachuDetails).toBeInTheDocument();
      expect(linkMoreDetails).not.toBeInTheDocument();
      expect(pikachuSummaryHeading).toBeInTheDocument();
      expect(pikachuSummaryParagraph).toBeInTheDocument();
    },
  );

  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações'
    + ' do pokémon.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const cameLocationsOfPikachu = screen.getByRole(
        'heading',
        { name: 'Game Locations of Pikachu' },
      );
      const locationImageExists = screen.getAllByRole('img')
        .some((locationImage) => locationImage.getAttribute('src') === 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'
          && locationImage.getAttribute('alt') === 'Pikachu location');
      const locationNameExists = screen.getByText('Kanto Viridian Forest');

      expect(cameLocationsOfPikachu).toBeInTheDocument();
      expect(locationImageExists).toBeTruthy();
      expect(locationNameExists).toBeInTheDocument();
    },
  );

  test(
    'Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      const favoritedPokemon = screen.getByRole(
        'checkbox',
        { name: 'Pokémon favoritado?' },
      );

      expect(favoritedPokemon).toBeInTheDocument();
    },
  );
});
