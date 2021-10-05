import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  const textMoreDetails = 'More details';
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0');
  });

  test('se é renderizado as imagen do pokemon em questão', () => {
    renderWithRouter(<App />);

    const pokemonImg = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg.getAttribute('src')).toEqual(url);
    expect(pokemonImg.getAttribute('alt')).toEqual('Pikachu sprite');
  });

  test('se o card tem um link para exibir detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test('se clicar no link, é redirecionado para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading',
      { level: 2,
        name: 'Pikachu Details' });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(moreDetails);

    const checkBoxfavorits = screen.getByRole('checkbox');
    userEvent.click(checkBoxfavorits);

    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar.getAttribute('src')).toEqual('/star-icon.svg');
  });
});
