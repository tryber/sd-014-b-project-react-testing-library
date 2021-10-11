import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando  APP', () => {
  test('Verifica o link Home, About e Favorite Pokémons', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,

    );

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorite);

    expect(history.location.pathname).toBe('/favorites');
    history.push('/anythink');

    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
