import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando Componente APP', () => {
  test('Verifica se existe o link Home, About e Favorite Pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const HomeButton = screen.getByRole('link', { name: 'Home' });
    expect(HomeButton).toBeInTheDocument();

    const AboutButton = screen.getByRole('link', { name: 'About' });
    expect(AboutButton).toBeInTheDocument();

    const FavoriteButton = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(FavoriteButton).toBeInTheDocument();

    userEvent.click(HomeButton);
    expect(history.location.pathname).toBe('/');

    userEvent.click(AboutButton);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(FavoriteButton);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/anythink');
    const NotFoundText = screen.getByText('Page requested not found');
    expect(NotFoundText).toBeInTheDocument();
  });
});
