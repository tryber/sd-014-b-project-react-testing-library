import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('1 - Quando a Aplicação inicializa', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Será validado se os links de navegação são exibidos na página de pesquisa', () => {
    renderWithRouter(<App />);

    const allLinks = screen.getAllByRole('link');

    expect(allLinks[0]).toBeInTheDocument();
    expect(allLinks[0]).toHaveTextContent('Home');
    expect(allLinks[1]).toBeInTheDocument();
    expect(allLinks[1]).toHaveTextContent('About');
    expect(allLinks[2]).toBeInTheDocument();
    expect(allLinks[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Será validado se a navegação para o Home ocorre corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[0], 'Home');

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Será validado se a navegação para o About ocorre corretamente"', () => {
    const { history } = renderWithRouter(<App />);

    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[1], 'About');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Será validado se a navegação para o Favorite Pokémons ocorre corretamente"', () => {
    const { history } = renderWithRouter(<App />);

    const allLinks = screen.getAllByRole('link');
    userEvent.click(allLinks[2], 'Favorite Pokémons');

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
