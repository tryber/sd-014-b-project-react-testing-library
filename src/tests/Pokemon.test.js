import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

const NEXT_POKE = 'next-pokemon';
const POKE_TYPE = 'pokemon-type';
const POKE_NAME = 'pokemon-name';

describe('Testa o componente Pokémon', () => {
  test('se contém o nome correto do Pokémon:', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId(POKE_NAME);
    const nextBtn = screen.getByTestId(NEXT_POKE);

    expect(pokeName).toHaveTextContent(pokemons[0].name);
    userEvent.click(nextBtn);
    expect(pokeName).toHaveTextContent(pokemons[1].name);
  });

  test('se o tipo correto é mostrado na tela:', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getByTestId(POKE_TYPE);
    const nextBtn = screen.getByTestId(NEXT_POKE);

    expect(pokeType).toHaveTextContent(pokemons[0].type);
    userEvent.click(nextBtn);
    expect(pokeType).toHaveTextContent(pokemons[1].type);
  });

  test('se o peso médio está no formato correto:', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    const format = `Average weight: ${value} ${measurementUnit}`;
    const pokeWeight = screen.getByTestId('pokemon-weight');

    expect(pokeWeight).toHaveTextContent(format);
  });

  test('se a imagem do pokémon está com src e alt corretos', () => {
    renderWithRouter(<App />);
    const { image, name } = pokemons[0];
    const pokeImg = screen.getByAltText(`${name} sprite`);

    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.src).toBe(image);
  });

  test('Testa se o link de navagação vai para URL correspondente', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('Testa se contém uma estrela no pokemons favoritados', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId(POKE_NAME);
    const detailsLink = screen.getByRole('link', { name: 'More details' });

    userEvent.click(detailsLink);
    const favCheck = screen.getByRole('checkbox');
    userEvent.click(favCheck);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    const favIcon = screen.getByAltText(`${pokemon.textContent} is marked as favorite`);

    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
