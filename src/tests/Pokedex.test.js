import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPokemon = 'Próximo pokémon';
  const typePokemon = 'pokemon-type';

  test('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter('/');
      const h2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(h2).toBeInTheDocument();
    });

  test('Testa se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.',
  () => {
    renderWithRouter('/');
    const button = screen.getByRole('button', { name: nextPokemon });
    expect(button).toBeInTheDocument();
    const pokemon = screen.getByText('Pikachu');

    expect(pokemon).toBeInTheDocument();

    userEvent.click(button);
    const proxPokemon = screen.getByText('Charmander');

    expect(proxPokemon).toBeInTheDocument();
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
  + ' se estiver no último Pokémon da lista',
  () => {
    renderWithRouter('/');

    const button = screen.getByRole('button', { name: nextPokemon });

    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    const proxPokemon = screen.getByText('Dragonair');
    expect(proxPokemon).toBeInTheDocument();

    userEvent.click(button);

    const lastPokemon = screen.getByText('Pikachu');
    expect(lastPokemon).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez.',
    () => {
      renderWithRouter('/');
      const pokemons = screen.getAllByTestId('pokemon-name');

      expect(pokemons.length).toBe(1);
    });

  test('Testa se a Pokédex tem os botões de filtro.',
    () => {
      renderWithRouter('/');
      const buttonElectric = screen.getByRole('button', { name: 'Electric' });
      const buttonFire = screen.getByRole('button', { name: 'Fire' });
      const buttonBug = screen.getByRole('button', { name: 'Bug' });
      const buttonPoison = screen.getByRole('button', { name: 'Poison' });
      const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
      const buttonNormal = screen.getByRole('button', { name: 'Normal' });
      const buttonDragon = screen.getByRole('button', { name: 'Dragon' });

      expect(buttonElectric).toBeInTheDocument();
      expect(buttonFire).toBeInTheDocument();
      expect(buttonBug).toBeInTheDocument();
      expect(buttonPoison).toBeInTheDocument();
      expect(buttonPsychic).toBeInTheDocument();
      expect(buttonNormal).toBeInTheDocument();
      expect(buttonDragon).toBeInTheDocument();
    });

  test('A partir da seleção de um botão de tipo,'
  + ' a Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter('/');
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttonType[1]);
    /* const buttonType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonType); */
    const pokemon = screen.getByTestId('pokemon-name');
    const type = screen.getAllByTestId(typePokemon);

    expect(pokemon).toContainHTML('Charmander');
    expect(type[0]).toContainHTML('Fire');

    const button = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(button);

    expect(pokemon).toContainHTML('Rapidash');
    expect(type[0]).toContainHTML('Fire');
  });

  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter('/');
    const buttonAll = screen.getByRole('button', { name: 'All' });

    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.'
  + ' e e ao carregar a página, o filtro selecionado deverá ser All',
  () => {
    renderWithRouter('/');
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toContainHTML('All');

    const type = screen.getByTestId(typePokemon);
    expect(type).toContainHTML('Electric');

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(button);

    const nextType = screen.getByTestId(typePokemon);
    expect(nextType).toContainHTML('Fire');
  });

  test('Deverá mostrar os Pokémons (sem filtros) quando o botão All for clicado;', () => {
    renderWithRouter('/');
    const buttonAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(buttonAll);

    const type = screen.getByTestId(typePokemon);
    expect(type).toContainHTML('Electric');
  });
});
