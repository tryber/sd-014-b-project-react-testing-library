import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });

  it('Informações do pokemon selecionado.', () => {
    const h2 = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();

    const linkDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).not.toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(h2Summary).toBeInTheDocument();

    const pDetails = screen.getByText(/oasts hard berries with electricity/i);
    expect(pDetails).toBeInTheDocument();
  });

  it('Mapas contendo as localizações do pokémon', () => {
    const h2 = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();

    const map = screen.getAllByAltText(/pikachu location/i);
    expect(map[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Favoritar pokemon', () => {
    const checkbox = screen.getByText(/pokémon favoritado/i);
    userEvent.click(checkbox);

    const starFav = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(starFav.src).toContain('/star-icon.svg');
  });
});
