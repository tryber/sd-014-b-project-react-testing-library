import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails.js', () => {
  const pikachuLocation = 'Pikachu location';
  const moreDetails = 'More details';

  it('as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const titlePokemon = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(titlePokemon).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const paragraf = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity/,
    );
    expect(paragraf).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas contendo as localizações 
  do pokémon`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const title = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(title).toBeInTheDocument();

    const image = screen.getAllByAltText(pikachuLocation);
    expect(image.length).toBe(2);
    expect(image[0].src).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[0]).toHaveAttribute('alt', pikachuLocation);
    expect(image[1]).toHaveAttribute('alt', pikachuLocation);
  });

  it(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes.`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const labelText = screen.getByText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
