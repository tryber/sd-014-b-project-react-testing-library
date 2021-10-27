import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// https://github.com/tryber/sd-014-b-project-react-testing-library/blob/anastacioneto-react-testing/src/tests/PokemonDetails.test.js
// Referência Anastacio

describe('Testa a funcionalidade do componente Pokemon Details', () => {
  it('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const pokemon = screen.getByText('Pikachu Details');
    expect(pokemon).toBeInTheDocument();

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(heading).toBeInTheDocument();

    const p = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(p).toBeInTheDocument();
  });

  it('existe na página uma seção de mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const heading2 = screen.getByRole('heading', {
      level: 2, name: /Game Locations of Pikachu/i });
    expect(heading2).toBeInTheDocument();

    const image = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(image).toHaveLength(2);

    expect(image[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const map1 = screen.getByText('Kanto Viridian Forest');
    expect(map1).toBeInTheDocument();

    const map2 = screen.getByText('Kanto Power Plant');
    expect(map2).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const favorite = screen.getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();

    const check = screen.getByRole('checkbox');
    expect(check).toBeInTheDocument();

    userEvent.click(check);
  });
});
