// Começando projeto.
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('Verifica se o primeiro link possui o texto Home.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('Verifica se o segundo link possui o texto About.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Verifica se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Verifica redirecionamento para "/" ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2 });
    expect(homeText).toBeInTheDocument();
  });

  it('Verifica redirecionamento para "/about" ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2 });
    expect(aboutText).toBeInTheDocument();
  });

  it('Verifica redirecionamento para "/favorites" ao clicar em Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteText = screen.getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(favoriteText).toBeInTheDocument();
  });

  it('Verifica redirecionamento para NotFound ao não encontrar a página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found-page');
    const notFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFound).toBeInTheDocument();
  });
});
