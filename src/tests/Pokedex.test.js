import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it('Verifica se o título "Encoutered pokémons" foi renderizado', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });

    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Deveria mostrar todos os botões de tipo', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('Deveria ', () => {
    renderWithRouter(<App />);
    const fireBttn = screen.getByRole('button', { name: 'Fire' });
    const allBttn = screen.getByRole('button', { name: 'All' });
    const nextBttn = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(fireBttn);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(allBttn);
    userEvent.click(nextBttn);
    userEvent.click(nextBttn);
    userEvent.click(nextBttn);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();
  });
});
