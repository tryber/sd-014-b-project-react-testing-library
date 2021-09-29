import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

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

  test('Verifica os botões de filtro', () => {
    // Resolve ''no magic numbers'' do lint sem graça
    const numberOfButtons = 7; // Excluindo o All
    renderWithRouter(<App />);
    // Encontra os botões que têm data-testid
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(numberOfButtons);
    // Encontra o botão All
    const allButton = screen.getByRole(
      'button', {
        name: 'All',
      },
    );
    expect(allButton).toBeInTheDocument();
    // Testa se tem um botão pra cada tipo de pokémon
    pokemons.forEach((pokemon) => {
      const button = screen.getByRole(
        'button', {
          name: `${pokemon.type}`,
        },
      );
      expect(button).toBeInTheDocument();
    });
  });

  test('Ao carregar a página, o botão All deve estar selecionado', () => {
    // Ao carregar a tela, o Pikachu vai estar na tela
    // Ao clicar em All, o Pikachu está na tela. Então...
    // Mas avaliando só seo Pikachu estava na tela, não passou no Stryker
    // Então adicionei linhas procurando e clicando no All. E então passou.
    renderWithRouter(<App />);
    const allButton = screen.getByRole(
      'button', {
        name: 'All',
      },
    );
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
