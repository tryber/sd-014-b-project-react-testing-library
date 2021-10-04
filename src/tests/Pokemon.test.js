import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

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

  test('se o card tem um link para exibir detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test('se clicar no link, é redirecionado para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const h2 = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(h2).toBeInTheDocument();
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);

    const checkBoxfavorits = screen.getByRole('checkbox');
    userEvent.click(checkBoxfavorits);

    const imgStar = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgStar.getAttribute('src')).toEqual('/star-icon.svg');
  });
});
