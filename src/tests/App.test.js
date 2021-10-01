import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1', () => {
  test('Existe link de navegação?', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
    // https://github.com/testing-library/jest-dom#tohavetextcontent
  });
  it('Ao clicar em home redireciona para pagina inicial?', () => {
    const { history } = renderWithRouter(<App />);
    const homeBTN = screen.getByText('Home');
    userEvent.click(homeBTN);
    expect(history.location.pathname).toBe('/');
  });
  it('Ao clicar em about redireciona para about?', () => {
    const { history } = renderWithRouter(<App />);
    const aboutBTN = screen.getByText('About');
    userEvent.click(aboutBTN);
    expect(history.location.pathname).toBe('/about');
  });
  it('Ao clicar em Pokémons Favoritos redireciona para a página de favoritos?', () => {
    const { history } = renderWithRouter(<App />);
    const favBTN = screen.getByText('Favorite Pokémons');
    userEvent.click(favBTN);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Renderiza "Not Found" em caso de url desconhecida?', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagina-desconhecida');
    const notFound = screen.getByText(/not found/);
    expect(notFound).toBeInTheDocument();
  });
  // regex passou pq?
});
