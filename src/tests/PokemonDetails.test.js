import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const moreDetails = 'More details';
  test(`se as informações detalhadas do Pokémon
   selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const h2Details = screen.getByText('Pikachu Details');
    const h2Summary = screen.getByText('Summary');
    const pAbstract = screen.getByText(/This intelligent Pokémon/);

    expect(h2Details).toBeInTheDocument();
    expect(h2Summary).toBeInTheDocument();
    expect(pAbstract).toBeInTheDocument();
  });

  test(`se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const h2GameLocations = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    const mapLocations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const mapImg = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(h2GameLocations).toBeInTheDocument();
    expect(screen.getByText(mapLocations[0])).toBeInTheDocument();
    expect(screen.getByText(mapLocations[1])).toBeInTheDocument();

    expect(screen
      .getAllByAltText('Pikachu location')[0]).toHaveAttribute('src', mapImg[0]);

    expect(screen
      .getAllByAltText('Pikachu location')[1]).toHaveAttribute('src', mapImg[1]);
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(checkboxFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favIcon).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    expect(favIcon).not.toBeInTheDocument();
  });
});
