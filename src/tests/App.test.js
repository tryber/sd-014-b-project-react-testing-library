import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
  test('deve renderizar o componente App na página inicial', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(home).toBeInTheDocument();
  });

  it('Testa se o link possui o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: 'Home',
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se o link possui o texto About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: 'About',
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const about = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(about).toBeInTheDocument();
  });

  test('Testa se o link possui o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: 'Favorite Pokémons',
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test(`Testa se a aplicação é redirecionada para a página Not Found ao
    entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/NotFound/');
    const noMatch = screen.getByText(/Not Found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
