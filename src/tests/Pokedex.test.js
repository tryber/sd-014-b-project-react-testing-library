import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const botaoProximo = 'next-pokemon';
const pokemonNameOut = 'pokemon-name';

describe('Testando o heading de Pokedex', () => {
  it('Testando se existe um heading com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });
});

describe('Testando a funcionalidade do botão "Próximo pokémon"', () => {
  it('Testando se o botão possuí o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(botaoProximo);
    expect(button.textContent).toBe('Próximo pokémon');
  });

  it('Testando se ao clikar no botão, um novo pokemon é redenrizado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(botaoProximo);

    const pokemonName = screen.getByTestId(pokemonNameOut);
    expect(pokemonName.textContent).toBe('Pikachu');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Charmander');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Caterpie');
  });

  it(`Testando se o primeiro pokemon da lista é
    renderizado ao botão estar no ultimo da lista`, () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(botaoProximo);

    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    const pokemonName = screen.getByTestId(pokemonNameOut);
    expect(pokemonName.textContent).toBe('Pikachu');
  });
});

describe('Testando a quantidade de pokemons renderizados', () => {
  it('Testando se é renderizado apenas um por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(pokemonNameOut);
    expect(pokemonName).toHaveLength(1);
  });
});

describe('Testando se a pokedex tem os botões de filtro', () => {
  it('Testa se os botões de tipo pokemon estão funcionando corretamente', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      userEvent.click(button);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(button.textContent).toBe(typePokemon.textContent);
      expect(buttons[0]).toBeInTheDocument();
    });
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('Testando se o nome do botão é all', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Testando se os pokemons aparecem normalmente sem filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(botaoProximo);
    const buttonFire = screen.getByRole('button', { name: 'Fire' });
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonFire);

    userEvent.click(buttonAll);
    const pokemonName = screen.getByTestId(pokemonNameOut);
    expect(pokemonName.textContent).toBe('Pikachu');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Charmander');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Caterpie');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser "All"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    history.push('/');
    const button = screen.getByTestId(botaoProximo);
    const pokemonName = screen.getByTestId(pokemonNameOut);
    expect(pokemonName.textContent).toBe('Pikachu');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Charmander');

    userEvent.click(button);
    expect(pokemonName.textContent).toBe('Caterpie');
  });
});
