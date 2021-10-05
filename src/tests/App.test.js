import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste para links e rotas no App.js', () => {
  it('existe link home e se ao clicar leva para rota /', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const Home = screen.getByRole('link', { name: 'Home' });
    expect(Home).toBeInTheDocument();

    userEvent.click(Home);
    expect(history.location.pathname).toBe('/');
  });

  it('existe link About e se ao clicar leva para rota /about', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const About = screen.getByRole('link', { name: 'About' });
    expect(About).toBeInTheDocument();

    userEvent.click(About);
    expect(history.location.pathname).toBe('/about');
  });

  it('existe link favorites e se ao clicar leva para rota /favorites ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const Favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(Favorite).toBeInTheDocument();

    userEvent.click(Favorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('ao digitar uma rota inexistente cai em NotFound', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/qualquer-coisa');

    const notFoud = screen.getByText('Page requested not found');
    expect(notFoud).toBeInTheDocument();
  });
});
