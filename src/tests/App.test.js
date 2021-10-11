import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('testa o componente App', () => {
  test('Verifica se o topo da app contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });
  it('se a app redireciona para a página "/" ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('se a app redireciona para a página "/about", ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('se a app redireciona para "/favorites", ao clicar em Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('se a aplicação redireciona para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
