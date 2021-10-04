import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  const pikachuPath = '/pokemons/25';
  const moreDetails = 'More details';

  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonNome = screen.getByTestId('pokemon-name');
    const pokemonTipo = screen.getByTestId('pokemon-type');
    const pokemonPeso = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(/sprite/);

    expect(pokemonNome).toHaveTextContent('Pikachu');
    expect(pokemonTipo).toHaveTextContent('Electric');
    expect(pokemonPeso).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`se o card do Pokémon indicado na Pokédex
   contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: moreDetails });

    expect(buttonDetails.href).toContain(pikachuPath);
  });

  test(`se ao clicar no link de navegação do Pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(buttonDetails);

    expect(history.location.pathname).toBe(pikachuPath);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const buttonDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(buttonDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img.src).toContain('/star-icon.svg');
  });
});
