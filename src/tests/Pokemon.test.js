import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import data from '../data';

const renderWithRouter = (comp) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{comp}</Router>), history,
  });
};

describe('Teste o componente <Pokemon.js />', () => {
  test('É renderizado um card com as informações de determinado pokémon.',
    () => {
      const { name, type, averageWeight: { value, measurementUnit }, image } = data[0];
      renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);

      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(screen.getByRole('img').src).toBe(image);
      expect(screen.getByRole('img').alt).toBe(`${name} sprite`);
    });
  test('O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido',
    () => {
      const { id } = data[0];
      renderWithRouter(
        <Pokemon pokemon={data[0]} isFavorite={false} />,
      );

      const details = screen.getByRole('link', { name: 'More details' });

      expect(details).toHaveAttribute('href', `/pokemons/${id}`);
    });
  test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { id } = data[0];
    const { history } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } />,
    );

    const details = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { name } = data[0];
    renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite />,
    );

    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
