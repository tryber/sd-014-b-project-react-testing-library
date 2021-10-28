import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const link = 'More details';
const pikachuLocation = 'Pikachu location';

describe(`Testando se as informações detalhados
  do pokemon estão na tela de detalhes`, () => {
  it('Testando se as informações do pokemon estão na tela', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const pokemonDetail = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(pokemonDetail).toBeInTheDocument();
  });

  it('Testando se o link de "Saiba Mais" foi retirado', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    expect(saibaMais).not.toBeInTheDocument();
  });

  it('Testando se existe o h2 com o texto "Summary"', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const summary = screen.getByRole('heading',
      { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });

  it('Testando se existe o paragrafo com a descrição do pokemon', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const p = screen
      .getByText(
        ('This intelligent Pokémon roasts')
        + (' ')
        + ('hard berries with electricity to make them tender enough to eat.'),
      );
    expect(p).toBeInTheDocument();
  });
});

describe('Testando se os maps são renderizados na tela', () => {
  it('Testando se tem um heading de indicação', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const summary = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(summary).toBeInTheDocument();
  });

  it('Testando se os mapas estão na tela ', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const img = screen.getAllByRole('img',
      { name: pikachuLocation });

    expect(img).toHaveLength(2);
  });

  it('Testando se o nome do mapa está na tela', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const mapOne = screen.getByText('Kanto Viridian Forest');
    const mapTwo = screen.getByText('Kanto Power Plant');

    expect(mapOne).toBeInTheDocument();
    expect(mapTwo).toBeInTheDocument();
  });

  it('Testando se os mapas possuiem o src correto', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const img = screen.getAllByRole('img',
      { name: pikachuLocation });

    expect(img[0]).toHaveAttribute('src', expect
      .stringContaining('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'));
    expect(img[1]).toHaveAttribute('src', expect
      .stringContaining('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'));
  });

  it('Testando se os mapas possuiem o alt correto', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const img = screen.getAllByAltText(pikachuLocation);
    img.forEach((map) => {
      expect(map).toBeInTheDocument();
    });
  });
});

describe('Testando se usuário pode favoritar um pokemon', () => {
  it('Testando se o favoritar existe', () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);

    const buttonFav = screen.getByLabelText('Pokémon favoritado?');
    expect(buttonFav).toBeInTheDocument();
  });

  it(`Testando se ao clikar na checkbox,
      o pokemons é favoritado e desfavoritado`, () => {
    renderWithRouter(<App />);
    const saibaMais = screen.getByRole('link',
      { name: link });
    userEvent.click(saibaMais);
    const buttonFav = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(buttonFav);
    const starFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFav).toBeInTheDocument();

    userEvent.click(buttonFav);
    expect(starFav).not.toBeInTheDocument();

    userEvent.click(buttonFav);
    const starFavChance = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavChance).toBeInTheDocument();

    userEvent.click(buttonFav);
    expect(starFavChance).not.toBeInTheDocument();
  });
});
