import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './services/renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('Deveria, no topo da aplicação, conter links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  // it(`Deveria, ao clicar no botão "Home",
  // redirecionar o usuário para a página inicial`, () => {
  //   const { history } = renderWithRouter(<App />);
  //   const homeLink = screen.getByRole('link', { name: 'Home' });

  //   userEvent.click(homeLink);

  //   expect(history.location.pathname).toBe('/');
  // });

  // it(`Deveria, ao clicar no botão "About",
  // redirecionar o usuário para a página de detalhes`, () => {
  //   const { history } = renderWithRouter(<App />);
  //   const aboutLink = screen.getByRole('link', { name: 'About' });

  //   userEvent.click(aboutLink);

  //   expect(history.location.pathname).toBe('/about');
  // });
  // it(`Deveria, ao clicar no botão "Favorite Pokémons",
  // redirecionar o usuário para a página de pokémons favoritos`, () => {
  //   const { history } = renderWithRouter(<App />);
  //   const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

  //   userEvent.click(favoritesLink);

  //   expect(history.location.pathname).toBe('/favorites');
  // });
});
