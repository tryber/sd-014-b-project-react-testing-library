import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';
import pokemons from '../data';

const allPokeTypes = pokemons.reduce((acc, { type }) => {
  if (!acc.includes(type)) acc.push(type);
  return acc;
}, []);

describe('5 - Rederize uma pokedex em "Home" e implemente suas funcionalidades', () => {
  const TYPE_TESTID = 'pokemon-type';
  const NAME_TESTID = 'pokemon-name';

  test('Se a página possui Heading e botões para filtro', () => {
    renderRoute('/');
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    const typesNumber = allPokeTypes.length;
    const allPokesBtn = screen.getByRole('button', { name: /all/i });
    const nextPokeBtns = screen.getByTestId('next-pokemon');
    const heading = screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i });

    expect(allPokesBtn).toBeInTheDocument();
    expect(nextPokeBtns).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(filterBtns).toHaveLength(typesNumber);
  });

  test('Se é mostrado um pokemon por vez', () => {
    renderRoute('/');

    expect(screen.getAllByTestId(NAME_TESTID)).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /details/i })).toHaveLength(1);
  });

  test('Se os botões de filtro funcionam', () => {
    renderRoute('/');

    const nextPokeBtns = screen.getByTestId('next-pokemon');
    const allPokesBtn = screen.getByRole('button', { name: /all/i });
    const pokeTypeBtns = screen.getAllByTestId('pokemon-type-button');
    const pokeTypes = pokeTypeBtns.reduce((acc, { textContent }) => {
      if (!acc.includes(textContent)) acc.push(textContent);
      return acc;
    }, []);

    expect(pokeTypes).toHaveLength(allPokeTypes.length);
    expect(pokeTypes).toStrictEqual(allPokeTypes);
    expect(allPokesBtn).toBeInTheDocument();

    userEvent.click(pokeTypeBtns[1]);
    expect(screen.getByTestId(TYPE_TESTID).textContent)
      .toBe(pokeTypeBtns[1].textContent);
    userEvent.click(nextPokeBtns);
    expect(screen.getByTestId(TYPE_TESTID).textContent)
      .toBe(pokemons[1].type);
    expect(allPokesBtn).toBeInTheDocument();

    userEvent.click(pokeTypeBtns[4]);
    expect(screen.getByTestId(TYPE_TESTID).textContent)
      .toBe(pokemons[4].type);
    userEvent.click(nextPokeBtns);
    expect(screen.getByTestId(TYPE_TESTID).textContent)
      .toBe(pokeTypeBtns[4].textContent);
    expect(allPokesBtn).toBeInTheDocument();

    userEvent.click(allPokesBtn);
    userEvent.click(nextPokeBtns);
    userEvent.click(nextPokeBtns);
    expect(screen.getByTestId(TYPE_TESTID).textContent)
      .toBe(pokemons[2].type);
    expect(screen.getByTestId(NAME_TESTID).textContent)
      .toBe(pokemons[2].name);

    userEvent.click(allPokesBtn);
    pokemons.forEach(() => {
      userEvent.click(nextPokeBtns);
    });
    expect(screen.getByTestId(NAME_TESTID).textContent)
      .toBe(pokemons[0].name);
  });
});
