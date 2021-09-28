import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderRouter from './renderRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  const { historic } = () => {
    beforeEach(() => {
      renderRouter(<App />);
    });
  };

  test('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
    // Armazena os links e acessa:
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByText('About');
    const linkFavPokemon = screen.getByText('Favorite Pokémons');
    // Testa se links acima existem:
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPokemon).toBeInTheDocument();
  });

  test('Teste é redirecionada para a home ao clicar no link da navegação', () => {
    const linkHome = screen.getByRole('link', { name: /Home/i });
    // Mock do clique:
    userEvent.click(linkHome);
    // Testa caminho da pasta
    const { location: { pathname } } = historic;
    expect(pathname).toBe('/');
  });

  test('Testa se redireciona p/ pág About URL/about,ao clicar no link About', () => {
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = historic.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se redireciona p/ Pokémons Favoritados na URL/favorites ao clicar', () => {
    const linkFavPokemon = screen.getByRole('link',
      { name: /Favorite Pokémons/i });
    userEvent.click(linkFavPokemon);
    const { pathname } = historic.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se é redirecionado para pag NotFound ao entrar em URL desconhecida', () => {
    // Tenta acessar uma 404
    historic.push('/mistakenlink');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
