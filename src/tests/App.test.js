import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App/', () => {
  test('deve renderizar o componente App na página inicial', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(home).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: 'Home',
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About', () => {
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

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: 'Favorite Pokémons',
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar
   em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
