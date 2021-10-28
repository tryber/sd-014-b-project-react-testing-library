import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const moreDetails = 'More details';
  test('Teste se as informações detalhadas do Pokémon aparecem na tela', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const pokemonName = screen.getByText('Pikachu Details');
    expect(pokemonName).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const pokemonSummary = screen.getByText(/This intelligent/);
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com mapas dos Pokémons', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const pokemonLocation = screen.getByText('Game Locations of Pikachu');
    expect(pokemonLocation).toBeInTheDocument();

    const quantityLocation = screen.getAllByAltText('Pikachu location');
    expect(quantityLocation.length).toBe(2);
    expect(quantityLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(quantityLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: moreDetails });
      userEvent.click(linkDetails);

      const checkFavourite = screen.getByLabelText('Pokémon favoritado?');
      expect(checkFavourite).toBeInTheDocument();
    });
});
