import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testa a funcionalidade do componente Pokemon Details', () => {
  it('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();

    const heading1 = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(heading1).toBeInTheDocument();
  });

  it('existe na página uma seção de mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const heading2 = screen.getByRole('heading', {
      level: 2, name: /Game Locations/i });
    expect(heading2).toBeInTheDocument();

    const image = screen.getByText(/location/i);
    expect(image).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const check = screen.getByRole('checkbox');
    expect(check).toBeInTheDocument();
  });
});
