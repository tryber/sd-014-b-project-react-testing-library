import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';

import renderWithRouter from '../renderWithRouter';

describe('Testa se o texto dos links de navegação estão corretos', () => {
  test('se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);

    const homeNav = screen.getByRole('link', { name: 'Home' });
    expect(homeNav).toBeInTheDocument();
  });

  test('se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);

    const aboutNav = screen.getByRole('link', { name: 'About' });
    expect(aboutNav).toBeInTheDocument();
  });

  test('se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favoriteNav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteNav).toBeInTheDocument();
  });
});

describe('Testa se os links de navegação redirecionam corretamente', () => {
  test('deve redirecionar pra página inicial ao clicar em Home ', () => {
    const { history } = renderWithRouter(<App />);

    const homeNav = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeNav);
    expect(history.location.pathname).toBe('/');
  });

  test('deve redirecionar pra página Sobre ao clicar em About ', () => {
    const { history } = renderWithRouter(<App />);

    const aboutNav = screen.getByRole('link', { name: 'About' });
    fireEvent.click(aboutNav);
    expect(history.location.pathname).toBe('/about');
  });

  test('deve redirecionar pra página de favoritos ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favNav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favNav);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('deve redirecionar pra página not found quando não a rota não existir', () => {
    const { history } = renderWithRouter(<App />);

    history.push('pagina-nao-existente');
    const requestNotFoundText = screen.getByText('Page requested not found');
    expect(requestNotFoundText).toBeInTheDocument();
  });
});
