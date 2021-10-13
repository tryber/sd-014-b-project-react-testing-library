import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetails);
    const page = screen.getByText('Pikachu Details');
    const heading = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const resume = screen.getByText(/This intelligent Pokémon/i);
    expect(page).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Summary');
    expect(resume).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const altPokemon = 'Caterpie location';
    const heading = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Caterpie' });
    const img = screen.getAllByAltText(altPokemon);
    const NUM_LOCATIONS = 4;
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Game Locations of Caterpie');
    expect(img).toHaveLength(NUM_LOCATIONS);
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png');
    expect(img[0].alt).toBe(altPokemon);
    expect(screen.getByText('Johto Route 30')).toBeInTheDocument();
    expect(img[1].src).toBe('https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png');
    expect(img[1].alt).toBe(altPokemon);
    expect(screen.getByText('Johto Route 31')).toBeInTheDocument();
    expect(img[2].src).toBe('https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png');
    expect(img[2].alt).toBe(altPokemon);
    expect(screen.getByText('Ilex Forest')).toBeInTheDocument();
    expect(img[3].src).toBe('https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png');
    expect(img[3].alt).toBe(altPokemon);
    expect(screen.getByText('Johto National Park')).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/23');
    const check = screen.getByLabelText('Pokémon favoritado?');
    expect(check).toBeInTheDocument();
    fireEvent.click(check);
    const img = screen.getByRole('img', { name: 'Ekans is marked as favorite' });
    expect(img).toBeInTheDocument();
    fireEvent.click(check);
    expect(img).not.toBeInTheDocument();
  });
});
