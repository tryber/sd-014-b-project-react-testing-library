import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testes do componente <PokemonDetails.js />', () => {
  it('As informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(linkMoreDetails);

    const titlePage = screen.getByText('Pikachu Details');
    const headingSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const resumeParagraph = screen.getByText(/This intelligent Pokémon/i);

    expect(titlePage).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(headingSummary).toBeInTheDocument();
    expect(headingSummary.textContent).toBe('Summary');
    expect(resumeParagraph).toBeInTheDocument();
  });

  it('Existe na página uma seção de mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const altPokemon = 'Caterpie location';
    const headingLocations = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Caterpie' });
    const locationsImg = screen.getAllByAltText(altPokemon);
    const NUM_LOCATIONS = 4;

    expect(headingLocations).toBeInTheDocument();
    expect(headingLocations.textContent).toBe('Game Locations of Caterpie');
    expect(locationsImg).toHaveLength(NUM_LOCATIONS);

    expect(locationsImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
    expect(locationsImg[0].alt).toBe(altPokemon);
    expect(screen.getByText('Johto Route 30')).toBeInTheDocument();

    expect(locationsImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png');
    expect(locationsImg[1].alt).toBe(altPokemon);
    expect(screen.getByText('Johto Route 31')).toBeInTheDocument();

    expect(locationsImg[2].src).toBe('https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png');
    expect(locationsImg[2].alt).toBe(altPokemon);
    expect(screen.getByText('Ilex Forest')).toBeInTheDocument();

    expect(locationsImg[3].src).toBe('https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png');
    expect(locationsImg[3].alt).toBe(altPokemon);
    expect(screen.getByText('Johto National Park')).toBeInTheDocument();
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');

    const checkFav = screen.getByLabelText('Pokémon favoritado?');

    expect(checkFav).toBeInTheDocument();

    fireEvent.click(checkFav);
    const starImg = screen.getByRole('img', { name: 'Ekans is marked as favorite' });
    expect(starImg).toBeInTheDocument();

    fireEvent.click(checkFav);
    expect(starImg).not.toBeInTheDocument();
  });
});
