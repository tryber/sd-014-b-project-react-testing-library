import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const favoriteInput = screen.getByRole('checkbox');
    userEvent.click(favoriteInput);

    const img = screen.getByAltText(/marked/);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent(/Average weight/);

    const imgPokemon = screen.getByAltText(/sprite/);
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Card do Pokémon indicado na Pokédex contém um link de navegação
    para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: /More/ });
    userEvent.click(buttonDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test(`Ao clicar no link de navegação do Pokémon, é feito o redirecionamento
    da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);

    const favoriteInput = screen.getByRole('checkbox');
    userEvent.click(favoriteInput);
  });
});
