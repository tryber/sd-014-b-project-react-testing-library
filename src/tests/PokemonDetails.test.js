import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const moreDetails = 'More details';
  test(`Se as informações detalhadas do
  Pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/electricity/);
    expect(paragraph).toBeInTheDocument();
  });

  test('se os mapas existem na página', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const titleLocation = screen.getByText('Game Locations of Pikachu');
    expect(titleLocation).toBeInTheDocument();

    const locationsAmount = screen.getAllByAltText('Pikachu location');
    expect(locationsAmount.length).toBe(2);
    expect(locationsAmount[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsAmount[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkDetails);

    const checkboxInput = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxInput).toBeInTheDocument();
  });
});
