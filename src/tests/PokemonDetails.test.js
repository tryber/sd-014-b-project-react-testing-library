import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';
const pokemon = pokemons[0];

describe('7 - Teste o componente <PokemonDetails.js />', () => {
  test(`Teste se as informações detalhadas do Pokémon selecionado são mostradas na
  tela`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const pokemonName = screen.getByRole('heading', { level: 2,
      name: `${pokemon.name} Details` });
    expect(pokemonName).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryTitle).toBeInTheDocument();
    const informationPokemon = screen.getByText(pokemon.summary);
    expect(informationPokemon).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas contendo as localizações
  do pokémon`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const mapTitle = screen.getByRole('heading', { level: 2,
      name: `Game Locations of ${pokemon.name}` });
    expect(mapTitle).toBeInTheDocument();
    pokemon.foundAt.forEach(({ location }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });
    const mapImage1 = screen.getAllByRole('img')[1];
    expect(mapImage1).toHaveAttribute('src', pokemon.foundAt[0].map);
    expect(mapImage1).toHaveAttribute('alt', `${pokemon.name} location`);
    const mapImage2 = screen.getAllByRole('img')[2];
    expect(mapImage2).toHaveAttribute('src', pokemon.foundAt[1].map);
    expect(mapImage2).toHaveAttribute('alt', `${pokemon.name} location`);
  });

  test(`Teste se o usuário pode favoritar um pokémon através da página de
  detalhes`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
    userEvent.click(labelFavorite);
    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
    userEvent.click(labelFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
