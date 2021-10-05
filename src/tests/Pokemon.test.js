import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);

    const tipePokemon = screen.getByTestId('pokemon-type');
    expect(tipePokemon).toHaveTextContent('Electric');
  });

  it('O peso do pokemon aparece neste formato: "<value> <measurementUnit>"', () => {
    renderWithRouter(<App />);

    const tipePokemon = screen.getByTestId('pokemon-weight');
    expect(tipePokemon).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do pokemon é exibida', () => {
    renderWithRouter(<App />);

    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Ao clicar em More Details abre a página de detalhes do pokemon.', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const favoriteStar = screen.getByRole('checkbox');
    userEvent.click(favoriteStar);

    const pokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
