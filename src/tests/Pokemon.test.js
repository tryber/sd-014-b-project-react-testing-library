import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações '
  + 'de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const pokemonImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um '
  + 'link de navegação para exibir detalhes deste Pokémon. '
  + 'O link deve possuir a URL /pokemons/<id>, onde <id> é o id '
  + 'do Pokémon exibido;', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails.href).toContain('pokemons/25');
  });

  // Usando como referência a aula ao vivo com Maitê (Tribo 14 A)
  test('Teste se ao clicar no link de navegação do Pokémon, é '
  + 'feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const favPokemon = screen.getByRole('checkbox');
    userEvent.click(favPokemon);

    const favIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favIcon.src).toContain('/star-icon.svg');
  });
});
