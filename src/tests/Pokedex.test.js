import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Requisito 5 - Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole(
      'heading', {
        level: 2,
        name: 'Encountered pokémons',
      },
    );
    expect(heading).toBeInTheDocument();
  });

  it('Testa se apenas um pokémon é exibido ao clicar em Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole(
      'button', {
        name: 'Próximo pokémon',
      },
    );
    fireEvent.click(button);
    // Testa se o botão existe
    expect(button).toBeInTheDocument();
    // Testa se aparece o Charmander quando clicar, porque
    // começa com o Pikachu
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    // Testa se tem só um pokémon na tela
    const pokemonsOnScreen = screen.getAllByText(/Average weight/i);
    const { length } = pokemonsOnScreen;
    expect(length).toBe(1);
  });
});
