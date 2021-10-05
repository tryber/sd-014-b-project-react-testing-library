import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0');
    expect(pokemonImg.getAttribute('src')).toEqual(url);
    expect(pokemonImg.getAttribute('alt')).toEqual('Pikachu sprite');
  });

  test(`se o card tem um link para exibir detalhes do Pokémon,
  e se esse link redireciona para pagina de detalhes do pokemon selecionado`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const checkBoxfavorits = screen.getByRole('checkbox');
    userEvent.click(checkBoxfavorits);

    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar.getAttribute('src')).toEqual('/star-icon.svg');
  });
});
