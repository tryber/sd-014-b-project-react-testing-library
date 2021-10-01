import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weigth = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');
    const pokemon = pokemons[0];

    expect(name).toHaveTextContent(pokemon.name);
    expect(type).toHaveTextContent(pokemon.type);
    expect(weigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', pokemon.image);
    expect(img).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  it('Testa se o card do Pokémon contém um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const link = screen.getByRole('link', { name: 'More details' });

    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Testa e existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const link = screen.getByRole('link', { name: 'More details' });

    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const img = screen.getAllByRole('img')[1];
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
