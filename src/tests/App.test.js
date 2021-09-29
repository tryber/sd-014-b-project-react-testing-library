import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente `<App.js />`', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const lengthMaxLinks = 4;

    const linksNav = screen.getAllByRole('link');
    expect(linksNav).toHaveLength(lengthMaxLinks);
    expect(linksNav[0]).toHaveTextContent('Home');
    expect(linksNav[1]).toHaveTextContent('About');
    expect(linksNav[2]).toHaveTextContent('Favorite Pokémons');
  });
});
