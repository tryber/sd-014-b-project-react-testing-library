import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const numberOfButtons = 7;

describe('5 - Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon
  é clicado`, () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(buttonNext);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    userEvent.click(buttonNext);
    const ekans = screen.getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();
    userEvent.click(buttonNext);
    const alakazam = screen.getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    userEvent.click(buttonNext);
    const mew = screen.getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
    userEvent.click(buttonNext);
    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(buttonNext);
    const snorlax = screen.getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();
    userEvent.click(buttonNext);
    const dragonair = screen.getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    userEvent.click(buttonNext);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /details/i })).toHaveLength(1);
  });

  // Nesta parte eu consultei o repositório do Luiz Gustavo
  // Fonte: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/95/files
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(numberOfButtons);
    pokemons.forEach(({ type }) => {
      const buttonType = screen.getByRole('button', { name: `${type}` });
      expect(buttonType).toBeInTheDocument();
    });
    userEvent.click(buttons[0]);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(buttons[1]);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
