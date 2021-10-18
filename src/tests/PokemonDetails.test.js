import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 7 - Teste o componente PokemonDetails', () => {
  test('se a página contém um texto <name>(pokemon) Details', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const subtitle = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });

    expect(subtitle).toBeInTheDocument();
  });

  // Teste realizado com dicas desse site - https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
  test('não deve existir o link de navegação para os detalhes do Pokémon na tela', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    expect(linkDetails).not.toBeInTheDocument();
  });

  test('na seção de detalhes deve conter um h2 com o texto Summary', () => {
    afterEach(() => {
      renderWithRouter(<App />);
    });
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
  });

  test('na seção de detalhes de conter um resumo sobre o pokemón selecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const resume = screen.getByText(/This intelligent Pokémon/);
    expect(resume).toBeInTheDocument();
  });

  test('na seção de detalhes deveria existir um h2 com o texto Game Locations...', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');

    const gameLocation = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Charmander' });

    expect(gameLocation).toBeInTheDocument();
  });

  test('se todas as localizações do Pokémon são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');

    const imgLocations = screen.getAllByAltText('Charmander location');
    imgLocations.forEach((map) => {
      expect(map).toBeInTheDocument();
    });
  });
});
