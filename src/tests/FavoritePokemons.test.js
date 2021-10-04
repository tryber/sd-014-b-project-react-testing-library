import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se a pessoa não tem pokémons favoritos', () => {
    render(<Router><FavoritePokemons /></Router>);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Teste se a pessoa não tem pokémons favoritos', () => {
    render(<Router><App /></Router>);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favorite);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
