import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js>', () => {
  test('O primeiro Link deve possuir o Texto Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const firstLink = screen.getAllByRole('link')[0];
    expect(firstLink).toHaveTextContent('Home');
  });
  test('O segundo Link deve possuir o Texto Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const secondLink = screen.getAllByRole('link')[1];
    expect(secondLink).toHaveTextContent('About');
  });
  test('O terceiro Link deve possuir o Texto Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const thirdLink = screen.getAllByRole('link')[2];
    expect(thirdLink).toHaveTextContent('Favorite Pokémons');
  });
  test(`se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });

    expect(history.location.pathname).toBe('/');
    expect(title).toBeInTheDocument();
  });
  test(`se a aplicação é redirecionada para a página About, 
  na URL /about ao clicar no link About da barra de navegação.`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(history.location.pathname).toBe('/about');
    expect(title).toBeInTheDocument();
  });
  test(`se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(history.location.pathname).toBe('/');
    expect(title).toBeInTheDocument();
  });
  test(`Se a aplicação é redirecionada para a página Not Found 
  ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida-que-não-existe');

    const textNotFound = screen.getByRole('heading', {
      level: 2,
    });
    expect(textNotFound).toBeInTheDocument();
  });
});
