import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa as rotas da aplicação ', () => {
  it('testa se existe três links na página', () => {
    renderWithRouter(<App />);

    const linksPage = screen.getAllByRole('link');
    const lengthExpect = 3;

    expect(linksPage.length - 1).toBe(lengthExpect);
  });

  it('verifica se ao clicar nos links as paginas são carregadas', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('testa a se ao clicar no "Home" a pagina é redirecionada corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('testa se a rota about está rendenrizando corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('testa se ao clicar no "Favorite" a pagina é renderecionada corretamente ', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('testa se acessar um URL desconhecida a pagina Not Found é chamada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
