import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemon = pokemons[0];
    const { value, measurementUnit } = pokemon.averageWeight;
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const measurement = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByRole('img');
    const linkDetails = screen.getByRole('link');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent('Electric');
    expect(measurement).toBeInTheDocument();
    expect(measurement).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', `${pokemon.name} sprite`);
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });
  test(
    ' se a URL exibida no navegador muda para /pokemon/<id> ao clicar em more details',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'More details' }));
      const url = history.location.pathname;
      expect(url).toBe('/pokemons/25');
    },
  );

  test(
    '  se ao clicar em more details, é redirecionado para pagina de detalhes',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'More details' }));
      const headerDetails = screen.getByText(/Pikachu Details/i);
      expect(headerDetails).toBeInTheDocument();
    },
  );

  test(
    '  se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      const pokemon = pokemons[0];
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const imgs = screen.getAllByRole('img');
      expect(imgs.length).toBe(2);
      const imgStar = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
      expect(imgStar).toBeInTheDocument();
    },
  );
});
