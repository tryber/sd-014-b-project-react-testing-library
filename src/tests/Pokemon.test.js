import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/sprite/i);

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon contém o link de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);

    expect(detailsLink.href).toContain('pokemons/25');
  });

  it('Teste se o redirecionamento para "More Details" é feito corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);
    const favCheck = screen.getByRole('checkbox');
    userEvent.click(favCheck);

    const favIcon = screen.getByAltText(/favorite/);
    expect(favIcon.src).toContain('star-icon');
  });
});

// Referência para testar o link: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/33/files
