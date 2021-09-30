import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouterRender from './RouterRender';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  test('Topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    RouterRender(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokemonsLink).toBeInTheDocument();
  });

  test(`Aplicação é redirecionada para a página inicial ao 
      clicar no link Home da barra de navegação`, () => {
    const { history } = RouterRender(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test(`Aplicação é redirecionada para a página de About 
    ao clicar no link About da barra de navegação`, () => {
    const { history } = RouterRender(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test(`Aplicação é redirecionada para a página de Pokémons Favoritados 
    ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = RouterRender(<App />);
    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test(`Aplicação é redirecionada para a página 
    Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = RouterRender(<App />);
    history.push('/pagina-inexistente');
    const noMatch = screen.getByRole('heading', { level: 2 });
    expect(noMatch).toBeInTheDocument();
  });
});
