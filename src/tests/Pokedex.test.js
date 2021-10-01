import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

const pokemonName = 'pokemon-name';

describe('testanto se o Pokedex esta funcionando corretamente', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('Testa  se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeInTheDocument();
  });

  it('Testa se só mostra um pokemon por vez', () => {
    renderWithRouter(<App />);
    const title = screen.getAllByTestId('pokemon-name');
    expect(title.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtros', () => {
    renderWithRouter(<App />);
    const array = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const allBtn = screen.getAllByTestId('pokemon-type-button');

    allBtn.forEach((type) => {
      expect(type).toBeInTheDocument();
    });

    array.forEach((type) => {
      // Passo 1 - pegar o botão pelo tipo
      const btnSelect = screen.getByRole('button', { name: type });
      // Passo 2- pegar um array de pokemon com o tipo pra comparar
      const filterPokemon = pokemons.filter((typePokemon) => type === typePokemon);
      // Passo 3- clicar no botão
      userEvent.click(btnSelect);
      // Passo 4- percorrer o array filtrado e verificar se o nome do
      // pokemon é renderizado
      const name = screen.getByTestId(pokemonName);
      const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      filterPokemon.forEach((element) => {
        expect(element.name).toContain(name);
        userEvent.click(btnNext);
      });
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    const name = screen.getByTestId(pokemonName);
    expect(name).toHaveTextContent('Pikachu');
  });
});
