import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  test(`O topo da aplicação deve conter os links
  denavegação Home, About e Favorite Pokémons`, () => {
    // const { history } = renderWithRouter(<App />);
    const linkNavHome = screen.getByRole('link', { name: 'Home' });
    const linkNavAbout = screen.getByRole('link', { name: 'About' });
    const linkNavFav = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkNavHome).toBeInTheDocument();
    expect(linkNavAbout).toBeInTheDocument();
    expect(linkNavFav).toBeInTheDocument();
  });

  test('testa se ao clicar em Home é renderizada a URL /', () => {
    const { history } = renderWithRouter(<App />);
    // console.log(history)

    const linkNavHome = screen.getByText('Home');
    // console.log(linkNavHome)

    fireEvent.click(linkNavHome);

    expect(history.location.pathname).toBe('/');
  });

  test('testa se ao clicar em Home é renderizada a URL /about', () => {
    const { history } = renderWithRouter(<App />);

    // const linkNavAbout = screen.getByRole('link', {name: 'About'});
    // console.log(linkNavAbout)
    // userEvent.click(getByText('About'));

    const pathname = screen.getByRole('link', { name: 'About' });

    fireEvent.click(pathname);

    expect(history.location.pathname).toBe('/about');
  });

  test('testa se ao clicar em Home é renderizada a URL /favorites', () => {
    const { history } = renderWithRouter(<App />);

    // userEvent.click(getByText('Favorite Pokémons'));

    const pathname = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(pathname);

    expect(history.location.pathname).toBe('/favorites');
  });

  test(`testa se a aplicação é redirecionada para a página Not
    Found ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const emoj = screen.getByLabelText('Crying emoji', { selector: 'span' });
    // console.log(emoj);
    const title = screen.getByRole('heading', {
      name: 'Page requested not found',
      level: 2,
    });

    expect(title).toBeInTheDocument();
    expect(emoj).toBeInTheDocument();
  });
});
