import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../../helper/renderWithRouter';

const moreDetails = 'More details';

describe('', () => {
  test(`Teste se as informações detalhadas do Pokémon
   selecionado são mostradas na tela.`, () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);

    const detailTitle = screen.getByText('Pikachu Details');
    expect(detailTitle).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryTitle).toBeInTheDocument();

    const resumePart1 = 'This intelligent Pokémon roasts hard berries with';
    const resumePart2 = ' electricity to make them tender enough to eat.';
    const resumeOfPokemon = screen.getByText(resumePart1 + resumePart2);
    expect(resumeOfPokemon).toBeInTheDocument();
  });

  test(`Testa se existe na página uma seção com os mapas
   contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);

    const gamesLocation = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(gamesLocation).toBeInTheDocument();

    const firstTextLocalization = screen.getByText('Kanto Viridian Forest');
    const secondTextLocalization = screen.getByText('Kanto Power Plant');

    expect(firstTextLocalization).toBeInTheDocument();
    expect(secondTextLocalization).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1].alt && images[2].alt).toBe('Pikachu location');
  });

  test('Testa se o usuário pode favoritar um pokémon pela da página de detalhes', () => {
    renderWithRouter(<App />);

    const link = screen.getByText(moreDetails);
    expect(link).toBeInTheDocument();
    fireEvent.click(link);

    const favoriteText = screen.getByText('Pokémon favoritado?');
    expect(favoriteText).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');

    fireEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
