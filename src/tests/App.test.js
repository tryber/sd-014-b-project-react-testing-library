import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('Teste conjunto fixo de links de navegação.', () => {
    render(<Router><App /></Router>);
    const nav = screen.getByRole('navigation');

    expect(nav).toBeInTheDocument();
  });

  it('Teste Reddirecionamento para a Home', () => {
    render(<Router><App /></Router>);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('Teste Reddirecionamento para a About', () => {
    render(<Router><App /></Router>);
    const home = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(home);

    const h2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('Teste Reddirecionamento para a Favorite', () => {
    render(<Router><App /></Router>);
    const home = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(home);

    const h2 = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });
});
