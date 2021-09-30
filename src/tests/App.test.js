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
    // Renderiza app e salva a url
    const { history } = renderWithRouter(<App />);
    // Clica onde tiver o texto home
    fireEvent.click(screen.getByText(/home/i));
    // Salva a url em string
    const { pathname } = history.location;
    // Testa se a string da url é a esperada
    expect(pathname).toBe('/');
  });

  it('Verifica se about direciona para /about', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se favorite pokémons direciona para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se uma URL desconhecida direciona para <NotFound />', () => {
    const { history } = renderWithRouter(<App />);
    // Adiciona a url uma palavra qualquer
    history.push('/trybe/');
    // Testa se mostra as palavras 'not found' na tela
    expect(screen.getByText(/not found/i));
  });
});
