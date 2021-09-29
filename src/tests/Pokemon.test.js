import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemonLink = '/pokemons/25';
  const buttonText = 'More details';
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/');
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent('Pikachu');
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent('Electric');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
      const pokemonImage = screen.getByAltText('Pikachu sprite');
      expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  test(`Teste se o card do Pokémon indicado na Pokédex contém 
  um link de navegação para exibir detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByText(buttonText);
    expect(moreDetailsLink).toHaveAttribute('href', pokemonLink);
  });
  test(`Teste se ao clicar no link de navegação do Pokémon, é feito 
  o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByText(buttonText);
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(pokemonLink);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde 
  <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByText(buttonText);
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(pokemonLink);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByText(buttonText);
    userEvent.click(moreDetailsLink);
    const checkboxFavorite = screen
      .getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkboxFavorite);
    const starShownFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(starShownFavorite).toBeInTheDocument();
    expect(starShownFavorite).toHaveAttribute('class', 'favorite-icon');
    expect(starShownFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
