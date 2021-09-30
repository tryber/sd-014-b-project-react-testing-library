import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';
import pokemons from '../data';

// https://stackoverflow.com/questions/43390873/template-literal-inside-of-the-regex
describe('6 - Renderize o card de um pokemon', () => {
  const regExName1 = new RegExp(String.raw`${pokemons[0].name} details`, 'i');
  const pokemonByType = pokemons
    .find((poke) => poke.type === pokemons[pokemons.length - 1].type);
  const regExName2 = new RegExp(String.raw`${pokemonByType.name} details`, 'i');

  test('Se o card é renderizado corretamente', () => {
    renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: /details/i }));

    expect(screen.getAllByRole('img')
      .some((img) => img.alt === `${pokemons[0].name} is marked as favorite`))
      .toBe(false);
    userEvent.click(screen.getByRole('checkbox', { checked: false }));
    const starIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toMatch(/star-icon.svg/);

    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    const pokeName1 = screen.getByTestId('pokemon-name').textContent;
    const pokeType1 = screen.getByTestId('pokemon-type').textContent;
    const pokeWeigth1 = screen.getByText(/average weight/i).textContent;
    const { averageWeight: weigth1 } = pokemons[0];
    const pokeImg1 = screen.getByAltText(`${pokemons[0].name} sprite`);

    expect(pokeName1).toBe(pokemons[0].name);
    expect(pokeType1).toBe(pokemons[0].type);
    expect(pokeWeigth1).toMatch(weigth1.value);
    expect(pokeWeigth1).toMatch(weigth1.measurementUnit);
    expect(pokeImg1.src).toBe(pokemons[0].image);

    userEvent.click(screen.getByRole('button', { name: pokemonByType.type }));

    const pokeName2 = screen.getByTestId('pokemon-name').textContent;
    const pokeType2 = screen.getByTestId('pokemon-type').textContent;
    const pokeWeigth2 = screen.getByText(/average weight/i).textContent;
    const { averageWeight: weigth2 } = pokemonByType;
    const pokeImg2 = screen.getByAltText(`${pokemonByType.name} sprite`);

    expect(pokeName2).toBe(pokemonByType.name);
    expect(pokeType2).toBe(pokemonByType.type);
    expect(pokeWeigth2).toMatch(weigth2.value);
    expect(pokeWeigth2).toMatch(weigth2.measurementUnit);
    expect(pokeImg2.src).toBe(pokemonByType.image);
  });

  test('Se o card contem um link para os detalhes do pokemon', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: /details/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: regExName1,
    })).toBeInTheDocument();

    expect(screen.getAllByAltText(`${pokemons[0].name} location`))
      .toHaveLength(pokemons[0].foundAt.length);
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);

    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    userEvent.click(screen.getByRole('button', { name: pokemonByType.type }));
    userEvent.click(screen.getByRole('link', { name: /details/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: regExName2,
    })).toBeInTheDocument();

    expect(screen.getAllByAltText(`${pokemonByType.name} location`))
      .toHaveLength(pokemonByType.foundAt.length);
    expect(screen.getByText(pokemonByType.summary)).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${pokemonByType.id}`);
  });
});
