import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

describe('6 - Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);

    const average = pokemon.averageWeight;
    const kg = `Average weight: ${average.value} ${average.measurementUnit}`;
    const weight = screen.getByText(kg);
    expect(weight).toBeInTheDocument();

    const imagePokemon = pokemon.image;
    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', imagePokemon);
    expect(pokemonImg).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const summary = screen.getByText(/Summary/i);
    expect(summary).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(labelFavorite);
    const pokemon = pokemons[0];
    const favoriteIcon = screen.getAllByRole('img')[1];
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
