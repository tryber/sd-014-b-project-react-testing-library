import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Requisito 1 - Testa <App.js />', () => {
  it('Verifica se Home, About e Favorite Pokémons estão na tela', () => {
    // Renderiza o componente App
    renderWithRouter(<App />);
    // Testes que procuram o texto no documento:
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
    // getByText recebe uma string porque toBeInTheDocument vai procurar pelo id
    // do elemento, que é uma string!
  });

  // history grava a última location
  // Muda com o próximo click
  // Se desestruturar pathname de location e de history em um
  // component, o próximo vai voltar o pathname do anterior

  it('Verifica se home direciona para /', () => {
    fireEvent.click(screen.getByText(/home/i));
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se about direciona para /about', () => {
    fireEvent.click(screen.getByText(/about/i));
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se favorite pokémons direciona para /favorites', () => {
    fireEvent.click(screen.getByText(/favorite pokémons/i));
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
