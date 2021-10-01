import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 5', () => {
  it('A página contém um heading "h2" com o texto "Encountered pokémons"?', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da lista 
  quando o botão "Próximo pokémon" é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPokeBTN = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    userEvent.click(nextPokeBTN);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getAllByText(/Average weight/i);
    expect(pokemonWeight).toHaveLength(1);
  });
  it('Teste se a pokedex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const sete = 7;
    expect(filterButtons).toHaveLength(sete);
    expect(filterButtons[0]).toHaveTextContent('Electric');
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(filterButtons[2]).toHaveTextContent('Bug');
    expect(filterButtons[3]).toHaveTextContent('Poison');
    expect(filterButtons[4]).toHaveTextContent('Psychic');
    expect(filterButtons[5]).toHaveTextContent('Normal');
    expect(filterButtons[6]).toHaveTextContent('Dragon');
    // acho que da pra fazer um forEach no filterButtons, mas depois eu tento
  });
  it('O botão "All" é exibido na tela?', () => {
    renderWithRouter(<App />);
    const buttonALL = screen.getByRole('button', {
      name: 'All',
    });
    expect(buttonALL).toBeInTheDocument();
  });
  it('Ao clicar em All, reseta a pesquisa', () => {
    renderWithRouter(<App />);
    const buttonALL = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(buttonALL);
    const picachu = screen.getByText('Pikachu');
    expect(picachu).toBeInTheDocument();
  });
});
