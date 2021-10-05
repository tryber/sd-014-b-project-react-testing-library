import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// é possivel acessar o historico de navegação do BrowserRouter
// BrowserRouter faz sentido no Browser, aqui nos testes é preciso criar um roteador

describe('Teste os componentes de "App"', () => {
  test('se exibe a página inicial a partir do Link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    // abstrai os codigos de renderizaçao do app
    const linkHome = screen.getByRole('link', { name: 'Home' }); // elemento para clicar
    userEvent.click(linkHome); // chamar o evento

    expect(history.location.pathname).toBe('/');
  });

  test('se exibe a página About a partir do Link "About"', () => {
    const { history } = renderWithRouter(<App />);
    // abstrai os codigos de renderizaçao do app
    const linkAbout = screen.getByRole('link', { name: 'About' }); // elemento para clicar
    userEvent.click(linkAbout); // chamar o evento

    expect(history.location.pathname).toBe('/about');
  });

  test('se exibe a página Pokemons Favoritos a partir do Link "Favoritos"', () => {
    const { history } = renderWithRouter(<App />);
    // abstrai os codigos de renderizaçao do app
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' }); // elemento para clicar
    userEvent.click(linkFavorites); // chamar o evento

    expect(history.location.pathname).toBe('/favorites');
  });

  test('se ao ir para uma URL desconhecida exibe a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundImage).toBeInTheDocument();
  });
});
