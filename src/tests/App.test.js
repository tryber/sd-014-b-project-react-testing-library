import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

/*
Ref: https://github.com/tryber/sd-014-b-project-react-testing-library/pull/60/commits/
  b0f54a44e09b9f447d72089be265d0f7f65c6e7e
*/

describe('Testa o componente "<App.js />"', () => {
  renderWithRouter(<App />);
  it('Deve renderizar os links "Home", "About" e "Favorite" ', () => {
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();
  });

  it('Deve redirecionar a página inicial ao clicar em "Home" ', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Deve redirecionar a página About ao clicar em "About" ', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /about/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/about');
  });

  it('Deve redirecionar a página Pokémons Favoritados'
  + 'ao clicar em "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Deve redirecionar a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
