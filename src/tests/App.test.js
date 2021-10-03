import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderwithRouter';

describe('testa o componente App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveTextContent('Home');
      expect(links[1]).toHaveTextContent('About');
      expect(links[2]).toHaveTextContent('Favorite Pokémons');
    });

  test(`Teste se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    expect(history.location.pathname).toEqual('/');
  });

  test(`Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    expect(history.location.pathname).toEqual('/about');
  });

  test('Redireciona a pagina Pokemons Favoritos ao clickar em Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    expect(history.location.pathname).toEqual('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found ao entrar em uma
  URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('qualquercoisa');
    const erro = screen.getByText(/Page requested not found/);
    expect(erro).toBeInTheDocument();
  });
});
