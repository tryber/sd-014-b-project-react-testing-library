import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa componente PokemonDetails', () => {
  test('se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const pokemon = pokemons[0];
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: 'More details' });
      userEvent.click(linkDetails);
      const headerPokemon = screen.getByRole('heading',
        { name: `${pokemon.name} Details`, level: 2 });
      const textSumary = screen.getByRole('heading', { name: 'Summary', level: 2 });
      const paragraphSummary = screen.getByText(`${pokemon.summary}`);
      expect(headerPokemon).toBeInTheDocument();
      expect(linkDetails).not.toBeInTheDocument();
      expect(textSumary).toBeInTheDocument();
      expect(paragraphSummary).toBeInTheDocument();
    });
  test('se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const pokemon = pokemons[0];
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: 'More details' });
      userEvent.click(linkDetails);
      const textLocations = screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${pokemon.name}` });
      const imgsLocationsLength = pokemon.foundAt.length;
      const imgs = screen.getAllByAltText('Pikachu location');
      expect(textLocations).toBeInTheDocument();
      expect(imgsLocationsLength).toBe(2);
      expect(imgs.length).toBe(Number('2'));
      const img1 = imgs[0];
      const img2 = imgs[1];
      expect(img1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(img1).toHaveAttribute('alt', `${pokemon.name} location`);
      expect(img1).toBeInTheDocument();
      expect(img2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(img2).toHaveAttribute('alt', `${pokemon.name} location`);
      expect(img2).toBeInTheDocument();
    });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();
  });
});
