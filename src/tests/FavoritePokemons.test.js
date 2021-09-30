import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRoute from '../helper/renderRoute';

describe('3 - Implemente a opção de favoritar pokemons e exibi-los', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const NOT_FAVORITES = 'No favorite pokemon found';
  const LINK_NAME = /favorite pokémons/i;
  const DETAILS = /details/i;
  const NAME_TESTID = 'pokemon-name';

  test('Se a página inicia sem pokemóns favoritos', () => {
    const { history } = renderRoute('/');

    userEvent.click(screen.getByRole('link', { name: LINK_NAME }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: LINK_NAME,
    })).toBeInTheDocument();
    expect(screen.getByText(NOT_FAVORITES)).toBeInTheDocument();

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se o sistema de favoritar pokemons funciona', () => {
    const { history } = renderRoute('/');

    const firstPoke = screen.getByTestId(NAME_TESTID).textContent;
    const pokeBtn1 = screen.getAllByTestId('pokemon-type-button')[0];

    userEvent.click(pokeBtn1);
    userEvent.click(screen.getByRole('link', { name: DETAILS }));
    userEvent.click(screen.getByRole('checkbox', { checked: false }));

    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    const pokeBtn2 = screen.getAllByTestId('pokemon-type-button')[5];

    userEvent.click(pokeBtn2);
    const secondPoke = screen.getByTestId(NAME_TESTID).textContent;
    userEvent.click(screen.getByRole('link', { name: DETAILS }));
    userEvent.click(screen.getByRole('checkbox', { checked: false }));

    userEvent.click(screen.getByRole('link', { name: LINK_NAME }));
    const favoritePokes = screen.getAllByTestId(NAME_TESTID);

    expect(screen.getByRole('heading', {
      level: 2,
      name: LINK_NAME,
    })).toBeInTheDocument();

    expect(favoritePokes).toHaveLength(2);
    expect(favoritePokes[0]).toHaveTextContent(firstPoke);
    expect(favoritePokes[1]).toHaveTextContent(secondPoke);

    userEvent.click(screen.getAllByRole('link', { name: DETAILS })[0]);
    userEvent.click(screen.getByRole('checkbox', { checked: true }));
    userEvent.click(screen.getByRole('link', { name: LINK_NAME }));
    userEvent.click(screen.getAllByRole('link', { name: DETAILS })[0]);
    userEvent.click(screen.getByRole('checkbox', { checked: true }));
    userEvent.click(screen.getByRole('link', { name: LINK_NAME }));

    expect(screen.getByText(NOT_FAVORITES)).toBeInTheDocument();

    expect(history.location.pathname).toBe('/favorites');
  });
});
