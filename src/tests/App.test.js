import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando <App />', () => {
  it('Teste se o topo da aplicação contém um Home, About, Favorite Pokémons', () => {
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
    expect(history.location.pathname).toEqual('/');

    userEvent.click(about);
    expect(history.location.pathname).toEqual('/about');

    userEvent.click(favorite);
    expect(history.location.pathname).toEqual('/favorites');

    history.push('/whatever');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
