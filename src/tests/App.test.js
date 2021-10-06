import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testes do componente <App.js />', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('A aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);

    fireEvent.click(homeLink);
    const pathName = history.location.pathname;

    expect(pathName).toBe('/');
  });

  it('A aplicação é redirecionada para a página de "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);

    fireEvent.click(aboutLink);
    const pathName = history.location.pathname;

    expect(pathName).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de "Pokémons Favoritados"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);

    fireEvent.click(favoritesLink);
    const pathName = history.location.pathname;

    expect(pathName).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');
    const noMatch = screen.getByText(/Page requested not found/i);

    expect(noMatch).toBeInTheDocument();
  });
});
