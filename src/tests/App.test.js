import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import App from '../App';

const history = createBrowserHistory();

describe('Testes do componente `<App.js />`', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    render(<Router history={ history }><App /></Router>);

    const linksNav = screen.getAllByRole('link');
    const lengthMaxLinks = 4;

    expect(linksNav).toHaveLength(lengthMaxLinks);
    expect(linksNav[0]).toHaveTextContent('Home');
    expect(linksNav[1]).toHaveTextContent('About');
    expect(linksNav[2]).toHaveTextContent('Favorite Pokémons');
  });
});
