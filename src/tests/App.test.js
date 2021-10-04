import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testa se a página contém os links de navegação', () => {
  test('se os links Home, About e Favorite Pokémons existem.', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  test('se a rota "/" é chamada pelo link Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('se a rota "/about" é chamada pelo link About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('se a rota "/favorites" é chamada pelo link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('se quando navegar para URL desconhecida, redireciona para Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('url-desconhecida');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
