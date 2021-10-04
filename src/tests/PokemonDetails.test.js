import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('PokemonDetails.js tests set', () => {
  it('should the details infos of the pokemon be showed in the screen', () => {
    // Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    customHistory.push('/pokemons/25');
    const pokeNameDetail = screen.getByRole('heading', {
      level: 2, name: 'Pikachu Details' });
    const summary = screen.getByRole('heading', {
      level: 2, name: 'Summary' });
    const pokeResume = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
    expect(pokeNameDetail).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokeResume).toBeInTheDocument();
  });

  it('should exists in the page some maps with the pokemon location', () => {
    // Teste se existe na página uma seção com os mapas contendo as localizações do pokémon.
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/23');
    const pokeImg = screen.getByRole('img', { name: 'Ekans location' });
    const gameLocationsText = screen.getByRole('heading', {
      level: 2, name: /game locations of ekans/i });
    expect(gameLocationsText).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
  });

  it('should the user can be capable of favorite a pokemon', () => {
    // Teste se o usuário pode favoritar um pokémon através da página de detalhes.
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/pokemons/65');
    const inputFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(inputFavorite);
    const starImg = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starImg).toBeInTheDocument();
    userEvent.click(inputFavorite);
    expect(starImg).not.toBeInTheDocument();
    const labelCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(labelCheckbox).toBeInTheDocument();
  });
});
