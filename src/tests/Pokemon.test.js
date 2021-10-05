import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testes requisito 6, teste do component Pokemon />', () => {
  test('Testa se um card com as informações corretas é renderizado. ', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByAltText(/sprite/);

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o pokemon tem um link exibir detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokeDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(pokeDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um icone de estrela para favoritar pokemons.', () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokeDetails);

    const pokeStar = screen.getByRole('checkbox');
    userEvent.click(pokeStar);

    const starImage = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');// nao consegui usar .src.toBe pois não havia endereço
  });
});
