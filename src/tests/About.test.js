// npx stryker run ./stryker/About.conf.json
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('verifica texto dos links no app.js', () => {
  test('primeiro link deve possuir texto Home', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
  });

  test('segundo link deve possuir texto About', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[1].textContent).toBe('About');
  });

  test('terceiro link deve possuir texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const links = screen.getByText('Favorite Pokémons');
    expect(links.textContent).toBe('Favorite Pokémons');
  });
});

describe('verifica redirecionamento de página', () => {
  test('clicar no link Home vai para página: inicial /', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[0]);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('clicar no link About vai para página /About', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getByRole('link', { name: 'About' });
    userEvent.click(links);
    expect(history.location.pathname).toBe('/about');
  });

  test('clicar no Favorite Pokémons vai para página /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Entrar em página desconhecida vai para página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');

    const notFound = screen.getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
