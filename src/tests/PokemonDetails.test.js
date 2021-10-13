import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const textMoreDetails = 'More details';
  test('se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(moreDetails);

    const textPokemonDetails = screen.getByText('Pikachu Details');
    expect(textPokemonDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const abstractTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(abstractTitle).toBeInTheDocument();

    const text = /This intelligent Pokémon roasts hard berries with electricity to make/;
    const pokemonSummary = screen.getByText(text);
    expect(pokemonSummary).toBeInTheDocument();
  });

  test('se existe na página uma seção com os mapas das localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(moreDetails);

    const h2 = screen.getByRole('heading',
      {
        level: 2,
        name: 'Game Locations of Pikachu' });
    expect(h2).toBeInTheDocument();

    const pikachuLocation = screen.getAllByAltText('Pikachu location');
    expect(pikachuLocation.length).toEqual(2);
    expect(pikachuLocation[0].getAttribute('src')).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[1].getAttribute('src')).toEqual('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(moreDetails);

    const favoriteCheckBox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckBox);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toBeInTheDocument();

    userEvent.click(favoriteCheckBox);
    expect(imgStar).not.toBeInTheDocument();
  });
});
