import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App.js', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFav).toBeInTheDocument();
  });
  test('Testa a rota do link Home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Testa a rota do link About', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Testa a rota do link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Testa a rota da página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rotanotfound');
    const notFound = screen.getByRole('heading',
      { level: 2, name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });
});
