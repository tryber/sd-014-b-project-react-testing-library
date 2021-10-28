import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do Pokedex', () => {
  it('Testa se existe um heading com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se aparece o proximo pokemon ao clicar no botão Proximo Pokemon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(btn);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se apenas um pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    const numberOfPokemon = screen.getAllByRole('link', { name: 'More details' });
    expect(numberOfPokemon.length).toBe(1);
  });

  it('Testa se os botões de tipo pokemon estão funcionando corretamente', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      userEvent.click(button);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(button.textContent).toBe(typePokemon.textContent);
    });
  });

  it('Testa se existe o botão all', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu.textContent).toBe('Pikachu');
  });
});
