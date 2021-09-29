import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Requisito 1 - Testa <App.js />', () => {
  it('Verifica se Home, About e Favorite Pokémons estão na tela', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  // history grava a última location
  // Muda com o próximo click
  // Se desestruturar pathname de location e de history em um
  // component, o próximo vai voltar o pathname do anterior

  it('Verifica se home direciona para /', () => {
    const { history } = renderWithRouter(<App />);
    event.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se about direciona para /about', () => {
    const { history } = renderWithRouter(<App />);
    event.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se favorite pokémons direciona para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    event.click(screen.getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
