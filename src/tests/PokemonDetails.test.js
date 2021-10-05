import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "PokemonDetails"', () => {
  test(` se as informações detalhadas do Pokémon selecionado 
  são mostradas na tela.`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    expect(screen.getByRole('heading', { level: 2, name: 'Pikachu Details' }))
      .toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
      .toBeInTheDocument();
    const p = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
    expect(p).toBeInTheDocument();
  });

  test(` se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    expect(screen.getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    const maps = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(maps[0]).toBeInTheDocument();
    expect(maps[1]).toBeInTheDocument();
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
