import React from 'react';
import { screen /* userEvent */ } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('App.js testcase:', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
  });

  // test(`se a aplicação é redirecionada para a página inicial,
  // na URL / ao clicar no link Home da barra de navegação.`, () => {
  //   const { history } = renderWithRouter(<App />);

  //   const home = screen.getByRole('link', { name: 'Home' });
  //   userEvent.click(home);
  //   // const { pathname } = history.location;

  //   expect();
  // });
});
