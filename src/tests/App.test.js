import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testa se App possui links de navegação', () => {
  test('Deve exibir o link Home', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const Home = screen.getByText('Home');
    const About = screen.getByText('About');
    const FVPokemons = screen.getByText('Favorite Pokémons');

    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(FVPokemons).toBeInTheDocument();
  });

  test('testa se link Home muda a rota', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('testa se link About muda a rota', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('testa se link Favorites muda a rota', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorties = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorties);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('testa se link desconhecido vai para not-found', () => {
    const { history } = renderWithRouter(<NotFound />);
    const nfPage = 'Page requested not found Crying emoji';
    const linkNotFound = screen.getByRole('heading', { name: nfPage });
    userEvent.click(linkNotFound);
    expect(history.location.pathname).toBe('/');
  });
});
