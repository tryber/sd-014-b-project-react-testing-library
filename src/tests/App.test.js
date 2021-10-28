import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App e suas funcionalidades', () => {
  it(`Testando se o link "Home" existe e se ao clikar, 
    redireciona à página correspondente.`, () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText('Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('link');

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it(`Testando se o link "About" existe e se ao clikar,
    redireciona à página correspondente.`, () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText('About');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('link');

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  it(`Testando se o link "Favorite Pokémons" existe e se ao clikar,
    redireciona à página correspondente.`, () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText('Favorite Pokémons');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('link');

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  it(`Testando se ao forçar um link inexistente,
    a página vai para o componente NotFound`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/paginaNotFound');

    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
