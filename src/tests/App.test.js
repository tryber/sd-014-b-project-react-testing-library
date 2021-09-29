import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando a aplicação - Testa o conjunto de links', () => {
  test('Testa se os links para Home, About e Favorite Pokémons são exibidos', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Home' });
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  test('Testa se a aplicação é direcionada para página inicial ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: 'Home' });
      userEvent.click(linkToHome);
      expect(history.location.pathname).toBe('/');
      const homePage = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(homePage).toBeInTheDocument();
    });

  test('Testa se a aplicação é direcionada para página about ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: 'About' });
      userEvent.click(linkToAbout);
      expect(history.location.pathname).toBe('/about');
      const aboutPage = screen.getByRole('heading', { name: 'About Pokédex' });
      expect(aboutPage).toBeInTheDocument();
    });

  test(`Testa se a aplicação é direcionada para página Pokémons Favoritados
   ao clicar no link Favorites Pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkToFavorites);
    expect(history.location.pathname).toBe('/favorites');
    const FavoritesPage = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(FavoritesPage).toBeInTheDocument();
  });

  test(`Testa se a aplicação é direcionada para página Not Found ao digitar
   uma URL que não existe`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-qualquer');
    expect(history.location.pathname).toBe('/rota-qualquer');
    const notFoundPage = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundPage).toBeInTheDocument();
  });
});
