import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it(`Testa se página contém um heading h2
  com o texto Encountered pokémons.`, () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it(`Testa se é exibido o próximo Pokémonda lista
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByTestId('next-pokemon');
    expect(nextPoke).toHaveTextContent('Próximo pokémon');
    // incompleto
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const image = screen.getAllByRole('img');
    expect(image.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const NUMBER_BUTTONS = 7;
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(NUMBER_BUTTONS);
  });
});
