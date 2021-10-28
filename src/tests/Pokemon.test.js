import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testes do componente <Pokemon.js />', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('O card do Pokémon contém um link de navegação para exibir detalhes do Pokémon',
    () => {
      renderWithRouter(<App />);
      const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

      expect(linkMoreDetails.href).toContain('/pokemons/25');
    });

  it('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

      fireEvent.click(linkMoreDetails);
      const pathName = history.location.pathname;
      const heading = screen.getAllByRole('heading', { level: 2 });

      expect(heading[0].textContent).toBe('Pikachu Details');
      expect(pathName).toBe('/pokemons/25');
    });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const checkFav = screen.getByRole('checkbox');
    fireEvent.click(checkFav);
    const imagens = screen.getAllByRole('img');

    expect(imagens[1].src).toContain('/star-icon.svg');
    expect(imagens[1].alt).toBe('Charmander is marked as favorite');
  });
});
