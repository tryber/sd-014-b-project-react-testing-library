import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  const moreDetailsConst = 'More details';
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0kg');
  });

  test('Se a imagem do pokemon é exibida', () => {
    renderWithRouter(<App />);

    const img = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(img.getAttribute('src')).toEqual(url);
    expect(img.getAttribute('alt')).toEqual(`${pokemonName.innerHTML} sprite`);
  });

  test('Se o card tem um link para exibir detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsConst });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  test('Se clicar no link, é redirecionado para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsConst });
    userEvent.click(moreDetailsLink);

    const pokemonDetails = screen.getByRole('heading',
      { level: 2,
        name: 'Pikachu Details' });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsConst });
    userEvent.click(moreDetailsLink);

    const favoritesCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoritesCheckbox);

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img.getAttribute('src')).toEqual('/star-icon.svg');
  });
});
// teste
