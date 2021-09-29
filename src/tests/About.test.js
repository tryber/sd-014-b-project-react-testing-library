import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('2 - Teste o componente <About.js />', () => {
/*   test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
  });
 */
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  // Fonte getByText: https://testing-library.com/docs/queries/about#textmatch
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const checkOne = screen.getByText((content, element) => element.tagName.toLowerCase()
      === 'p' && content.startsWith('This'));
    expect(checkOne).toBeInTheDocument();
    const checkTwo = screen.getByText((content, element) => element.tagName.toLowerCase()
      === 'p' && content.startsWith('One'));
    expect(checkTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', srcImage);
  });
});
