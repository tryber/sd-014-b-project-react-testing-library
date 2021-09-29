import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const mewLink = '/pokemons/151';

describe('Teste 7 - PokemonDetails.js', () => {
  it(`Teste se as informações detalhadas do
  Pokémon selecionado são mostradas na tela`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewLink);

    const pokeName = screen.getByText('Mew Details');
    const h2 = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const resume = screen.getByText(/Apparently, it appears only to those people who/);

    expect(pokeName).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção
  com os mapas contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewLink);

    const locationOfMew = screen.getByRole('heading',
      { name: 'Game Locations of Mew' });
    const LocationIMG = screen.getByAltText('Mew location');
    const locationArea = screen.getByText('Faraway Island');

    expect(locationOfMew).toBeInTheDocument();
    expect(LocationIMG).toBeInTheDocument();
    expect(LocationIMG).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    );
    expect(locationArea).toBeInTheDocument();
  });

  it(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(mewLink);

    const favoritCheckbox = screen.getByRole(
      'checkbox',
      { name: 'Pokémon favoritado?' },
    );

    expect(favoritCheckbox).toBeInTheDocument();
    fireEvent.click(favoritCheckbox);
  });
});
