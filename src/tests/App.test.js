import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste 1 - App.js', () => {
  it(`Teste se o primeiro link possui o texto "Home"
  e vai pra "página inicial" ao ser clicado`, () => {
    // Chama função renderWithRouter
    const { history } = renderWithRouter(<App />);
    // Procura se existe um link com o nome Home
    // Tentei usar getByAllRole e retornou um array, falhando a linha 24
    const Home = screen.getByRole('link', { name: 'Home' });
    // Verifica se foi definido na pagina o retorno da requisição acima
    expect(Home).toBeDefined();
    // Usa uma biblioteca que simula o usuário e clica no link capturado acima
    fireEvent.click(Home);
    // Captura na tela se foi impresso um H2 com o termo descrito no indice "name"
    const homeText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    // Verifica se a navegação está igual ao que deveria ser
    expect(history.location.pathname).toBe('/');
    // Verifica se foi definido na pagina o retorno da requisição da linha 26
    expect(homeText).toBeInTheDocument();
  });

  // Mesmo principio do teste anterior
  it(`Teste se o segundo link possui o texto "About" 
  e se redireciona para a página "About" ao ser clicado`, () => {
    const { history } = renderWithRouter(<App />);
    const About = screen.getByRole('link', { name: 'About' });
    expect(About).toBeDefined();
    fireEvent.click(About);
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(history.location.pathname).toBe('/about');
    expect(aboutText).toBeInTheDocument();
  });

  // Mesmo principio do teste anterior
  it(`Teste se o terceiro link possui o texto "Favorite Pokémons"
  e se redireciona para a página "Pokémons Favoritados" ao ser clicado`, () => {
    const { history } = renderWithRouter(<App />);
    const Favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(Favorite).toBeDefined();
    fireEvent.click(Favorite);
    const favoriteText = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(history.location.pathname).toBe('/favorites');
    expect(favoriteText).toBeInTheDocument();
  });

  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { history } = renderWithRouter(<App />);
    // Seta a URI do "navegador"
    history.push('/pagina/que-nao-existe/123');
    // Procura texto Not Found padrão
    const noMatch = screen.getByText(/Page requested not found/i);
    // Verifica se o texto existe no documento.
    expect(noMatch).toBeInTheDocument();
  });
});
