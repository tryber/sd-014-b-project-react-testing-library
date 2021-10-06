import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o PokemonDetails', () => {
  test('Testa se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    expect(moreDetailsLink).not.toBeInTheDocument();
    const pokemonDetailsText = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokemonDetailsText).toBeInTheDocument();
    const summaryHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();
    const summaryParagraph = screen.getByText('This intelligent', { exact: false });
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const gameLocationHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(gameLocationHeading).toBeInTheDocument();
    const locationImage = screen.getAllByRole('img', {
      alt: 'Pikachu location',
    });
    expect(locationImage[1].alt).toBe('Pikachu location');
    expect(locationImage[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Testa se o usuário pode favoritar um pokémon através da página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkboxIput = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkboxIput).toBeInTheDocument();
  });
});
